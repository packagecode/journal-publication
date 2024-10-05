import { Fragment } from "react";
import Pages from "../layouts/pages";

const About = () => {
  return (
    <Fragment>
      <Pages pageTitle="About DIU Journal of Multidisciplinary Research">
        <div className="p-4 terms-conditions" id="terms-scroll">
          <div className="mb-5">
            <p className="mb-3 op-7 ">
              Welcome to the DIU Journal of Multidisciplinary Research
              (DIU-JMR), a peer-reviewed academic journal committed to advancing
              research in a broad spectrum of multidisciplinary fields, with a
              special emphasis on innovations in materials-based technologies.
              Hosted by Daffodil International University (DIU), the journal
              serves as a platform for scientists, researchers, and industry
              professionals to publish cutting-edge research that fosters
              progress in diverse scientific disciplines.
            </p>
          </div>
          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Our Mission</span>
          </h6>
          <div className="mb-4">
            <p className="op-7 mb-2">
              At DIU-JMR, our mission is to bridge the gap between academia and
              industry by promoting groundbreaking research in materials
              science, engineering, and related fields. We aim to create a
              comprehensive repository of knowledge that explores the
              intersection of innovative materials, technology, and their
              real-world applications. By encouraging multidisciplinary
              collaboration, we seek to address some of the most pressing
              challenges of modern society, from sustainable energy solutions to
              advanced biomedical materials.
            </p>
          </div>

          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Focus Areas</span>
          </h6>
          <div className="mb-4">
            <p className="op-7 mb-2">
              The journal publishes original research, reviews, and case studies
              across a wide range of topics, including but not limited to:
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                1 - Materials Science and Engineering:{" "}
              </span>
              <span className="op-7 mb-2">
                Exploration of novel materials, nanotechnology, and advanced
                manufacturing techniques.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                2 - Environmental Sustainability{" "}
              </span>
              <span className="op-7 mb-2">
                Research on eco-friendly materials and their role in reducing
                carbon footprints
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                3 - Biomedical Engineering:{" "}
              </span>
              <span className="op-7 mb-2">
                Innovations in biomaterials for healthcare and medical
                applications
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                4 - Energy Systems and Storage:{" "}
              </span>
              <span className="op-7 mb-2">
                Cutting-edge developments in renewable energy materials, battery
                technologies, and efficient energy systems.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                5 - Advanced Electronics and Optoelectronics:{" "}
              </span>
              <span className="op-7 mb-2">
                Contributions to the next generation of smart materials and
                devices.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                6 - Smart Materials and Structures:{" "}
              </span>
              <span className="op-7 mb-2">
                Research focused on responsive materials and their applications
                in construction, transportation, and beyond.
              </span>
            </p>
          </div>

          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Editorial Board</span>
          </h6>
          <div className="mb-4">
            <p className="op-7 mb-2">
              Our editorial board comprises leading experts from academia and
              industry, bringing together a wealth of knowledge across various
              disciplines. Their diverse expertise helps maintain the journal’s
              high academic standards and ensures that DIU-JMR remains a trusted
              source of cutting-edge research.
            </p>
          </div>
          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Join Us in Shaping the Future</span>
          </h6>
          <div className="mb-4">
            <p className="op-7 mb-2">
              At DIU-JMR, we believe that innovations in materials and their
              applications have the power to transform industries and society.
              We invite you to be part of this exciting journey by contributing
              your research, engaging with global experts, and helping shape the
              future of multidisciplinary science.
            </p>
            <p className="op-7 mb-2">
              This content aims to clearly communicate the journal’s mission,
              focus areas, and appeal to a broad, interdisciplinary audience
              while highlighting its unique contributions to materials-based
              technologies. Let me know if you’d like to make any adjustments!
            </p>
          </div>
        </div>
      </Pages>
    </Fragment>
  );
};

export default About;
