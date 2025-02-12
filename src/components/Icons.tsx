import { Eclipse, LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <Eclipse
      size={32}
      className="text-blue-500"
      style={{ transform: "rotate(45deg)" }}
      {...props}
    />
  ),
};
