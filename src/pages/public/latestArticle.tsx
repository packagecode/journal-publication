import media43 from "@/assets/images/media/media-43.jpg";
import media44 from "@/assets/images/media/media-44.jpg";
import media45 from "@/assets/images/media/media-45.jpg";
import { useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const LatestArticle = () => {
  const [showImages, setShowImages] = useState({
    1: false,
    2: false,
  });
  return (
    <Card className="custom-card mt-3">
      <Card.Header>
        <Card.Title>Latest Articles</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="d-sm-flex align-items-cneter">
          <div className="d-flex align-items-center flex-fill">
            {/* <span className="avatar avatar-sm avatar-rounded me-3">
                <img src={face15} alt="" />
              </span> */}
            <div>
              <p className="mb-0 fw-semibold">
                <span className="fs-11 text-muted fw-normal">
                  Tue,25 Dec 2022 - 11:45
                </span>
              </p>
              <p className="mb-0 text-muted"></p>
            </div>
          </div>
          <div className="mt-sm-0 mt-2">
            <span className="badge bg-primary me-1">Open Access</span>
            <span className="badge bg-secondary">Article</span>
          </div>
        </div>
        <div className="d-flex align-items-cener">
          <span className="badge bg-success-transparent me-3">30 pages</span>
          <span className="badge bg-info-transparent me-3">3456 KB</span>
          <a href="#" className="badge bg-success-transparent ">
            <i className="bi bi-file-earmark-pdf"></i>
          </a>
        </div>
        <div className="mt-3">
          <h6 className="fw-semibold">
            <Link to="/article-details">
              Deep Immune and RNA Profiling Revealed Distinct Circulating CD163+
              Monocytes in Diabetes-Related Complications
            </Link>
          </h6>
          <cite className="fs-14">
            by{" "}
            <b>
              Elisha Siwan,Jencia Wong,Belinda A. Brooks,Diana Shinko,Callum J.
              Baker, Nandan Deshpande,Susan V. McLennan,Stephen M. Twigg and
              Danqing Min
            </b>
          </cite>
          <div className="mt-1">
            <cite className="fs-12 text-muted">
              Int. J. Mol. Sci. 2024, 25(18), 10094;
              https://doi.org/10.3390/ijms251810094 (registering DOI) - 19 Sep
              2024
            </cite>
          </div>
          <p className="mb-4 text-muted">
            Around the time I first learned how to meditate, something amazing
            happened to me. It happened one day, quite spontaneously. I was
            working as a lawyer at the time and I used to walk down a little
            lane way to the train station on my commute to work. It’s not an
            especially beautiful lane way
          </p>
          <p className="mb-5 text-muted">
            The world is animated by the wind. This invisible, mysterious force
            can bring a landscape alive. Its absence can cast a calm stillness
            over the earth. On barren mountain tops its power is barely
            perceptible; in forests and seas its presence becomes manifest.
            Winds are wild, and sometimes destructive. When we look deeply into
            the surely gravity’s law, strong as an ocean current, takes hold of
            even the strongest thing and pulls it toward the heart of the world.
            Each thing- each stone, blossom, child – is held in place. Only we,
            in our arrogance, push out beyond what we belong to for some empty
            freedom. If we surrendered
          </p>
        </div>
        <Button
          variant="link"
          style={{ textDecoration: "none" }}
          onClick={() => setShowImages({ ...showImages, 1: !showImages[1] })}
        >
          {showImages[1] && <i className="ri-arrow-down-line"></i>}
          {!showImages[1] && <i className="ri-arrow-right-line"></i>} Show
          Figures
        </Button>
        {showImages[1] && (
          <Carousel
            fade
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            indicators={false}
          >
            <Carousel.Item className="active">
              <img src={media43} className="d-block w-100" alt="..." />
            </Carousel.Item>
            <Carousel.Item>
              <img src={media44} className="d-block w-100" alt="..." />
            </Carousel.Item>
            <Carousel.Item>
              <img src={media45} className="d-block w-100" alt="..." />
            </Carousel.Item>
          </Carousel>
        )}
      </Card.Body>
      <hr />
      <Card.Body>
        <div className="d-sm-flex align-items-cneter">
          <div className="d-flex align-items-center flex-fill">
            {/* <span className="avatar avatar-sm avatar-rounded me-3">
                <img src={face15} alt="" />
              </span> */}
            <div>
              <p className="mb-0 fw-semibold">
                <span className="fs-11 text-muted fw-normal">
                  Tue,25 Dec 2022 - 11:45
                </span>
              </p>
              <p className="mb-0 text-muted"></p>
            </div>
          </div>
          <div className="mt-sm-0 mt-2">
            <span className="badge bg-primary me-1">Open Access</span>
            <span className="badge bg-secondary">Article</span>
          </div>
        </div>
        <div className="d-flex align-items-cener">
          <span className="badge bg-success-transparent me-3">30 pages</span>
          <span className="badge bg-info-transparent me-3">3456 KB</span>
          <a href="#" className="badge bg-success-transparent ">
            <i className="bi bi-file-earmark-pdf"></i>
          </a>
        </div>
        <div className="mt-3">
          <h6 className="fw-semibold">
            Deep Immune and RNA Profiling Revealed Distinct Circulating CD163+
            Monocytes in Diabetes-Related Complications
          </h6>
          <cite className="fs-14">
            by{" "}
            <b>
              Elisha Siwan,Jencia Wong,Belinda A. Brooks,Diana Shinko,Callum J.
              Baker, Nandan Deshpande,Susan V. McLennan,Stephen M. Twigg and
              Danqing Min
            </b>
          </cite>
          <div className="mt-1">
            <cite className="fs-12 text-muted">
              Int. J. Mol. Sci. 2024, 25(18), 10094;
              https://doi.org/10.3390/ijms251810094 (registering DOI) - 19 Sep
              2024
            </cite>
          </div>
          <p className="mb-4 text-muted">
            Around the time I first learned how to meditate, something amazing
            happened to me. It happened one day, quite spontaneously. I was
            working as a lawyer at the time and I used to walk down a little
            lane way to the train station on my commute to work. It’s not an
            especially beautiful lane way
          </p>
          <p className="mb-5 text-muted">
            The world is animated by the wind. This invisible, mysterious force
            can bring a landscape alive. Its absence can cast a calm stillness
            over the earth. On barren mountain tops its power is barely
            perceptible; in forests and seas its presence becomes manifest.
            Winds are wild, and sometimes destructive. When we look deeply into
            the surely gravity’s law, strong as an ocean current, takes hold of
            even the strongest thing and pulls it toward the heart of the world.
            Each thing- each stone, blossom, child – is held in place. Only we,
            in our arrogance, push out beyond what we belong to for some empty
            freedom. If we surrendered
          </p>
        </div>
        <Button
          variant="link"
          style={{ textDecoration: "none" }}
          onClick={() => setShowImages({ ...showImages, 2: !showImages[2] })}
        >
          {showImages[2] && <i className="ri-arrow-down-line"></i>}
          {!showImages[2] && <i className="ri-arrow-right-line"></i>} Show
          Figures
        </Button>
        {showImages[2] && (
          <Carousel
            fade
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            indicators={false}
          >
            <Carousel.Item className="active">
              <img src={media43} className="d-block w-100" alt="..." />
            </Carousel.Item>
            <Carousel.Item>
              <img src={media44} className="d-block w-100" alt="..." />
            </Carousel.Item>
            <Carousel.Item>
              <img src={media45} className="d-block w-100" alt="..." />
            </Carousel.Item>
          </Carousel>
        )}
      </Card.Body>
    </Card>
  );
};

export default LatestArticle;
