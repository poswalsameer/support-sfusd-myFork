const MapListCard = (props: {
  img: string;
  name: string;
  district: string;
  students: string;
  frl: string;
  ell: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div
        className="bg-cover bg-center h-40 rounded-t-lg"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="pt-4">
        <div className="font-bold text-xl">{props.name}</div>
        <div className="text-gray-600">{props.district}</div>
        <div className="flex items-center mt-2">
          <img
            src="/icons/student-icon.png"
            alt="Student Icon"
            className="w-5 h-5 mr-2"
          />
          {props.students || "N/A"}
        </div>
        <div className="flex items-center mt-2">
          <img
            src="/icons/lunch-icon.png"
            alt="Lunch Icon"
            className="w-5 h-5 mr-2"
          />
          {props.frl ? `${props.frl}%` : "N/A"}
        </div>
        <div className="flex items-center mt-2">
          <img
            src="/icons/ell-icon.png"
            alt="ELL Icon"
            className="w-5 h-5 mr-2"
          />
          {props.ell ? `${props.ell}%` : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default MapListCard;
