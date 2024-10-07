import * as React from "react";
import bulmaSlider from "bulma-slider/dist/js/bulma-slider.min.js";

const Interpolation: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const INTERP_BASE = "/interpolation/stacked";
  const NUM_INTERP_FRAMES = 82;

  const [interpImages, setInterpImages] = React.useState<HTMLImageElement[]>(
    []
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < NUM_INTERP_FRAMES; i++) {
      const path = `${INTERP_BASE}/${String(i + 1).padStart(6, "0")}.jpg`;
      const img = new Image();
      img.src = path;
      images[i] = img;
    }
    setInterpImages(images);
  }, []);

  React.useEffect(() => {
    if (
      typeof bulmaSlider !== "undefined" &&
      typeof bulmaSlider.attach === "function"
    ) {
      bulmaSlider.attach();
    }
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentImageIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="columns is-centered">
      <div className="column is-full-width">
        <div className="columns is-vcentered interpolation-panel">
          <div className="column is-3 has-text-centered">
            <img
              src="/interpolation/stacked/000001.jpg"
              className="interpolation-image"
              alt="Interpolate start reference image."
            />
            <p>Start Frame</p>
          </div>
          <div className="column interpolation-video-column">
            <div id="interpolation-image-wrapper">
              <img
                id="interpolation-image"
                src={interpImages[currentImageIndex]?.src || ""}
                alt="Interpolation Image"
              />
            </div>
            <input
              className="slider is-fullwidth is-large is-info"
              id="interpolation-slider"
              step="1"
              min="0"
              max={(NUM_INTERP_FRAMES - 1).toString()}
              value={currentImageIndex.toString()}
              type="range"
              onChange={handleSliderChange}
            />
          </div>
          <div className="column is-3 has-text-centered">
            <img
              src="/interpolation/stacked/000082.jpg"
              className="interpolation-image"
              alt="Interpolation end reference image."
            />
            <p className="is-bold">End Frame</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interpolation;