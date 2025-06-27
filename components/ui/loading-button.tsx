import { Loader } from "lucide-react";

export default function LoadingButton() {
  return (
    <>
      <Loader className="animate-spin size-4" />
      Loading...
    </>
  );
}
