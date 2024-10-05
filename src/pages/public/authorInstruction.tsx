import { Fragment } from "react";
import { Link } from "react-router-dom";
import Pages from "../layouts/pages";

const AuthorInstruction = () => {
  return (
    <Fragment>
      <Pages pageTitle="Instructions for Authors">
        <div className="p-4 terms-conditions" id="terms-scroll">
          <div className="mb-5">
            <p className="mb-3 op-7 ">
              The DIU Journal of Multidisciplinary Research (DIU-JMR) welcomes
              submissions from researchers, scholars, and professionals across
              various disciplines, with a focus on innovations in
              materials-based technologies. To ensure a smooth submission and
              review process, please carefully follow the guidelines outlined
              below.
            </p>
          </div>
          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Submission Categories</span>
          </h6>
          <div className="mb-4">
            <p className="op-7 mb-2">
              DIU-JMR accepts the following types of manuscripts:
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                1 - Original Research Articles:{" "}
              </span>
              <span className="op-7 mb-2">
                In-depth research that presents novel findings.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                2 - Review Articles:{" "}
              </span>
              <span className="op-7 mb-2">
                Comprehensive reviews of current developments in relevant
                fields.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">3 - Case Studies: </span>
              <span className="op-7 mb-2">
                Practical case studies demonstrating real-world applications of
                research.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                4 - Short Communications:{" "}
              </span>
              <span className="op-7 mb-2">
                Brief reports on new and significant findings.
              </span>
            </p>
          </div>

          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Manuscript Preparation</span>
          </h6>
          <div className="mb-4">
            <div className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                1 - General Formatting{" "}
              </span>
              <span className="op-7 mb-2">
                <ul>
                  <li>
                    Language: All manuscripts must be written in clear, concise
                    English.
                  </li>
                  <li>
                    File Format: Manuscripts should be submitted in Microsoft
                    Word (.doc or .docx) format.
                  </li>
                  <li>
                    Length: Research articles should not exceed 8,000 words.
                    Review articles may extend to 10,000 words, while short
                    communications should be limited to 3,000 words.
                  </li>
                  <li>
                    Font: Use Times New Roman, 12-point font, double-spaced
                    throughout.
                  </li>
                  <li>Margins: Set all margins to 1 inch (2.5 cm).</li>
                  <li>
                    Page Numbers: Number all pages consecutively, starting from
                    the title page.
                  </li>
                </ul>
              </span>
            </div>
            <div className="mb-2">
              <span className="fw-semibold fs-14">
                2 - Manuscript Structure{" "}
              </span>
              <span className="op-7 mb-2">
                <ul>
                  <li>
                    Title Page
                    <ul>
                      <li>Title of the manuscript (concise and informative)</li>
                      <li>
                        Full names of all authors, including affiliations and
                        contact details of the corresponding author
                      </li>
                      <li>ORCID IDs (optional but recommended)</li>
                    </ul>
                  </li>
                  <li>
                    Abstract: A summary of the research, not exceeding 250
                    words. It should clearly state the objective, methods, main
                    findings, and conclusions.
                  </li>
                  <li>
                    Keywords: Provide 4-6 keywords to assist in indexing and
                    searchability.
                  </li>
                  <li>
                    Main Text: Organize the manuscript into sections
                    <ul>
                      <li>
                        Introduction: State the research problem, objectives,
                        and significance.
                      </li>
                      <li>
                        Materials and Methods: Provide a detailed description of
                        the experimental or analytical methods used.
                      </li>
                      <li>
                        Results: Present key findings with clarity. Use tables
                        and figures where necessary.
                      </li>
                      <li>
                        Discussion: Interpret the results and compare them with
                        previous research.
                      </li>
                      <li>
                        Conclusion: Summarize the key takeaways and suggest
                        future research directions.
                      </li>
                    </ul>
                  </li>
                  <li>
                    References: Follow the APA (American Psychological
                    Association) citation style. Ensure that all references
                    mentioned in the text are listed at the end, and vice versa.
                  </li>
                </ul>
              </span>
            </div>
            <div className="mb-2">
              <span className="fw-semibold fs-14">3 - Tables and Figures </span>
              <span className="op-7 mb-2">
                <ul>
                  <li>
                    All tables and figures should be embedded within the text
                    and numbered consecutively.
                  </li>
                  <li>
                    Tables must have a descriptive title placed above the table,
                    while figures should have captions placed below.
                  </li>
                  <li>
                    Ensure that figures and tables are clear and easy to read,
                    especially for online viewing.
                  </li>
                </ul>
              </span>
            </div>
            <p className="mb-2">
              <span className="fw-semibold fs-14">
                4 - Supplementary Materials:{" "}
              </span>
              <span className="op-7 mb-2">
                If your article includes any supplementary materials (such as
                videos, datasets, or additional images), please upload them
                along with your submission. Clearly label all supplementary
                files.
              </span>
            </p>
          </div>

          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Ethical Guidelines</span>
          </h6>
          <div className="mb-4">
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                1 - Originality and Plagiarism:{" "}
              </span>
              <span className="op-7 mb-2">
                Manuscripts submitted to DIU-JMR must be original work and must
                not have been previously published or under consideration for
                publication elsewhere. Plagiarism will result in the rejection
                of the manuscript.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">2 - Authorship: </span>
              <span className="op-7 mb-2">
                All authors listed in the manuscript should have contributed
                significantly to the research. Changes in authorship (adding or
                removing authors) are not allowed after submission unless a
                formal request is made and approved by the editorial team.{" "}
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                3 - Conflicts of Interest:{" "}
              </span>
              <span className="op-7 mb-2">
                Authors are required to disclose any potential conflicts of
                interest that may influence the research or its interpretation.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                4 - Ethics Approval:{" "}
              </span>
              <span className="op-7 mb-2">
                If the research involves human participants, animals, or
                hazardous materials, authors must include a statement of ethics
                approval in the methods section.{" "}
              </span>
            </p>
          </div>
          <h6 className="fw-bold pb-3 text-default op-7">
            <span className="terms-heading">Submission Process</span>
          </h6>
          <div className="mb-4">
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                1 - Create an Account:{" "}
              </span>
              <span className="op-7 mb-2">
                Visit the <Link to="/">DIU-JMR submission portal</Link> and
                register an account if you do not already have one
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                2 - Submit Your Manuscript:{" "}
              </span>
              <span className="op-7 mb-2">
                Log in to the submission portal, complete the required
                submission form, and upload your manuscript and supplementary
                materials.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">3 - Cover Letter: </span>
              <span className="op-7 mb-2">
                Include a brief cover letter addressed to the Editor-in-Chief,
                summarizing the significance of your work and confirming that
                the manuscript has not been submitted elsewhere.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                3 - Review Process:{" "}
              </span>
              <span className="op-7 mb-2">
                All submissions undergo a double-blind peer-review process. The
                review typically takes 4-6 weeks. Authors may be required to
                make revisions based on reviewer feedback.
              </span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold mb-2 fs-14">
                4 - Final Decision:{" "}
              </span>
              <span className="op-7 mb-2">
                Upon acceptance, authors will be notified, and the article will
                be processed for publication.
              </span>
            </p>
          </div>
        </div>
      </Pages>
    </Fragment>
  );
};

export default AuthorInstruction;
