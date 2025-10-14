import Model1 from '../Assets/Model2.png';


export default function BannerImage() {
  return (
    <section className="my-12 md:my-16" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="w-full">
        <img
          src={Model1}
          alt="Fashion banner"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
        />
      </div>
    </section>
  );
}
