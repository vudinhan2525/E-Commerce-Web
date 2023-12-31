// eslint-disable-next-line no-unused-vars
import img1 from '../../../../assets/img/introduceprod/1.webp';
function IntroducePost({ product }) {
  return (
    <div className="mt-5">
      <header className="text-xl font-bold">{product.header}</header>
      <div className="text-[15px] leading-[23px] ">
        <p className="mt-3">{product.text}</p>
        {/* <h2 className="mt-3 text-lg font-semibold">Designed with many breakthroughs</h2>
        <p className="mt-3">
          In terms of size, iPhone 13 will have 4 different versions and the size will not change compared to the
          current iPhone 12 series. If the iPhone 12 has a change in design from rounded edges (the design maintained
          from the iPhone 6 to iPhone 11 Pro Max) to a square design (previously present on iPhone 4 to iPhone 5S, SE) .
        </p>
        <p className="mt-3">
          The iPhone 13 still maintains a similar design. The device still has a steel frame version, some minimalist
          aluminum frame versions. Similar to next year, Apple will also launch 4 versions: iPhone 13, 13 mini, 13 Pro
          and 13 Pro Max.
        </p>
        <div className="mt-3">
          <div
            style={{ backgroundImage: `url(${img1})` }}
            className="w-[100%] h-[400px] bg-no-repeat bg-center bg-contain"
          ></div>
        </div> */}
      </div>
    </div>
  );
}

export default IntroducePost;
