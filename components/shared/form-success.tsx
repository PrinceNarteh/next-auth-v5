import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 flex items-center p-3 rounded-md gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="size-4" />
      {message}
    </div>
  );
};
