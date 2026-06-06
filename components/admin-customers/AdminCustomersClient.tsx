"use client";

import { useMemo, useState } from "react";
import AdminCustomersHeader from "./AdminCustomersHeader";
import AdminCustomersStats from "./AdminCustomersStats";
import CustomerAIBox from "./CustomerAIBox";
import CustomerDetail from "./CustomerDetail";
import CustomerList from "./CustomerList";
import type {
  AdminCustomerAIResult,
  AdminCustomerWithOrders,
} from "@/types/database";

type AdminCustomersClientProps = {
  initialCustomers: AdminCustomerWithOrders[];
};

type CustomerFilter = "all" | "new" | "returning" | "vip" | "inactive";

export default function AdminCustomersClient({
  initialCustomers,
}: AdminCustomersClientProps) {
  const [customers, setCustomers] =
    useState<AdminCustomerWithOrders[]>(initialCustomers);

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    initialCustomers[0]?.id ?? null,
  );

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState<CustomerFilter>("all");
  const [noteDraft, setNoteDraft] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState<AdminCustomerAIResult | null>(null);

  const selectedCustomer = useMemo(() => {
    return (
      customers.find((customer) => customer.id === selectedCustomerId) ?? null
    );
  }, [customers, selectedCustomerId]);

  const filteredCustomers = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return customers.filter((customer) => {
      const totalOrders = Number(customer.total_orders || 0);
      const totalSpent = Number(customer.total_spent || 0);

      const matchSearch =
        !keyword ||
        customer.name.toLowerCase().includes(keyword) ||
        customer.phone.toLowerCase().includes(keyword) ||
        customer.address?.toLowerCase().includes(keyword) ||
        customer.note?.toLowerCase().includes(keyword);

      const matchFilter =
        filter === "all" ||
        (filter === "new" && totalOrders <= 1) ||
        (filter === "returning" && totalOrders >= 2) ||
        (filter === "vip" && totalSpent >= 1000000) ||
        (filter === "inactive" && isInactiveCustomer(customer.last_order_at));

      return matchSearch && matchFilter;
    });
  }, [customers, searchValue, filter]);

  function handleSelectCustomer(customerId: string) {
    const customer = customers.find((item) => item.id === customerId) ?? null;

    setSelectedCustomerId(customerId);
    setNoteDraft(customer?.note ?? "");
    setAiResult(null);
  }

  async function handleSaveNote() {
    if (!selectedCustomer) return;

    setIsSavingNote(true);

    try {
      const response = await fetch(
        `/api/admin/customers/${selectedCustomer.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note: noteDraft,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không lưu được ghi chú khách hàng.");
        return;
      }

      const updatedCustomer = result.customer as AdminCustomerWithOrders;

      setCustomers((current) =>
        current.map((customer) =>
          customer.id === updatedCustomer.id
            ? {
                ...customer,
                note: updatedCustomer.note,
                updated_at: updatedCustomer.updated_at,
              }
            : customer,
        ),
      );

      alert("Đã lưu ghi chú khách hàng.");
    } catch {
      alert("Có lỗi xảy ra khi lưu ghi chú.");
    } finally {
      setIsSavingNote(false);
    }
  }

  async function handleGenerateAI(customerId: string) {
    setIsGeneratingAI(true);
    setAiResult(null);

    try {
      const response = await fetch(`/api/admin/customers/${customerId}/ai`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message ?? "Không tạo được gợi ý AI.");
        return;
      }

      setAiResult(result.data);
    } catch {
      alert("Có lỗi xảy ra khi tạo gợi ý AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminCustomersHeader />

        <AdminCustomersStats customers={customers} />

        <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
          <CustomerList
            customers={filteredCustomers}
            totalCustomers={customers.length}
            selectedCustomerId={selectedCustomerId}
            searchValue={searchValue}
            filter={filter}
            onSearchChange={setSearchValue}
            onFilterChange={setFilter}
            onSelectCustomer={handleSelectCustomer}
          />

          <div className="space-y-6">
            <CustomerDetail
              customer={selectedCustomer}
              noteDraft={noteDraft}
              isSavingNote={isSavingNote}
              onNoteChange={setNoteDraft}
              onSaveNote={handleSaveNote}
            />

            {selectedCustomer && (
              <CustomerAIBox
                customer={selectedCustomer}
                aiResult={aiResult}
                isGenerating={isGeneratingAI}
                onGenerate={() => handleGenerateAI(selectedCustomer.id)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function isInactiveCustomer(lastOrderAt: string | null) {
  if (!lastOrderAt) return true;

  const lastOrderDate = new Date(lastOrderAt).getTime();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - lastOrderDate > thirtyDays;
}
