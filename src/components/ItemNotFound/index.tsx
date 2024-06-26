type ItemNotFoundProps = {
  title: string;
  description?: string;
};

export const ItemNotFound = ({ title, description }: ItemNotFoundProps) => {
  return (
    <div className="text-center py-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <h2 className="text-md md:text-lg">{description}</h2>}
    </div>
  );
};
