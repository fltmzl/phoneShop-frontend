interface Props {
  text: string | number;
  className?: string;
}

const Badge = ({ text, className }: Props) => {
  return <div className={`text-[11px] bg-red-500 text-white px-[5.2px] py-[0.5px] rounded-full ${className}`}>{text}</div>;
};

export default Badge;
