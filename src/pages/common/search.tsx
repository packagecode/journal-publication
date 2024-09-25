import { BaseInput } from "@/components";
import { useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";

interface SearchProps {
  onSearch?: any;
}
const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [advance, setAdvance] = useState(false);
  const [form, setForm] = useState({
    title: "",
    name: "",
    journal: "",
    article: "",
    section: "",
    volume: "",
    issue: "",
    number: "",
    page: "",
  });

  const changeHandler = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (onSearch) onSearch(form);
    console.log(form);
  };

  return (
    <section className="section section-bg " id="statistics">
      <div className="container text-center position-relative">
        <p className="fs-22 fw-semibold text-primary mb-1">
          <span className="landing-section-heading">Search for Articles</span>
        </p>
        {/* <h3 className="fw-semibold mb-2">
              More than 120+ projects completed.
            </h3> */}
        <div className="mb-3 p-3 text-center rounded-2 bg-white border row justify-content-md-center">
          <Col xs={12} md={6} lg className="mb-3">
            <BaseInput
              placeholder="Title/Keyword"
              value={form.title}
              name="title"
              onChange={changeHandler}
            />
          </Col>
          <Col xs={12} md={6} lg className="mb-3">
            <BaseInput
              placeholder="Author/Affiliation/Email"
              value={form.name}
              name="name"
              onChange={changeHandler}
            />
          </Col>
          <Col xs={12} md={6} lg className="mb-3">
            <select
              className="form-control"
              name="journal"
              onChange={changeHandler}
            >
              <option value="all">All Journal</option>
              <option value="sensors">Sensors</option>
              <option value="digital">Digital</option>
            </select>
          </Col>
          <Col xs={12} md={6} lg className="mb-3">
            <select
              className="form-control"
              name="article"
              onChange={changeHandler}
            >
              <option value="all">All Articles Type</option>
              <option value="article">Article</option>
              <option value="review">Review</option>
            </select>
          </Col>
          <Col xs={12} md={6} lg className="mb-3">
            <Stack direction="horizontal" gap={3}>
              <Button
                variant="primary-gradient"
                className="btn"
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                variant="light"
                className="btn ms-auto"
                onClick={() => setAdvance(!advance)}
              >
                Advance
              </Button>
            </Stack>
          </Col>
          {advance && (
            <div style={{ clear: "both" }} className="row p-0">
              <Col xs={12} md={6} lg className="mb-3">
                <select
                  className="form-control"
                  name="section"
                  onChange={changeHandler}
                >
                  <option value="" disabled selected>
                    Section
                  </option>
                  <option value="all">All Section Type</option>
                  <option value="article">Article</option>
                  <option value="review">Review</option>
                </select>
              </Col>
              <Col xs={12} md={6} lg className="mb-3">
                <BaseInput
                  placeholder="Volume"
                  value={form.volume}
                  name="volume"
                  onChange={changeHandler}
                />
              </Col>
              <Col xs={12} md={6} lg className="mb-3">
                <BaseInput
                  placeholder="Issue"
                  value={form.issue}
                  name="issue"
                  onChange={changeHandler}
                />
              </Col>
              <Col xs={12} md={6} lg className="mb-3">
                <BaseInput
                  placeholder="Number"
                  value={form.number}
                  name="number"
                  onChange={changeHandler}
                />
              </Col>
              <Col xs={12} md={6} lg className="mb-3">
                <BaseInput
                  placeholder="Page"
                  value={form.page}
                  name="page"
                  onChange={changeHandler}
                />
              </Col>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
