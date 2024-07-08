export default function Loader({ size = 8 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-black`}
      ></div>
    </div>
  );
}
