type ProductIconProps = {
  imageUrl: string | null;
  name: string;
  size?: "sm" | "md";
};

export default function ProductIcon({
  imageUrl,
  name,
  size = "md",
}: ProductIconProps) {
  const boxSize = size === "sm" ? "h-12 w-12 text-2xl" : "h-16 w-16 text-3xl";

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${boxSize} rounded-2xl object-cover transition group-hover:scale-110`}
      />
    );
  }

  return (
    <div
      className={`${boxSize} flex items-center justify-center rounded-2xl bg-emerald-100 shadow-inner transition group-hover:scale-110`}
    >
      🧴
    </div>
  );
}
