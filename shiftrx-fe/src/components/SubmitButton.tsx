interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
