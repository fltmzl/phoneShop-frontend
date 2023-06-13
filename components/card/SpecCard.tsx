import { BiChip } from "react-icons/bi";
import { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  title: string;
  value: string;
}

const SpecCard = ({ icon, title, value }: Props) => {
  return (
    <div className="flex-y-center gap-5 bg-slate-900 text-white rounded-2xl py-3 px-5">
      <div className="basis-1/12 text-4xl">{icon}</div>
      <div>
        <div className="basis-full text-sm text-gray-400">{title}</div>
        <div className="line-clamp-1">{value}</div>
      </div>
    </div>
  );
};

export default SpecCard;
