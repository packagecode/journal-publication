import BaseButton from "@/components/core/BaseButton";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useGlobalService from "@/hooks/useGlobalService";
import { RootState } from "@/redux/store";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ScriptAuthor from "../FormComponent/ScriptAuthors";

interface ComponentProps {
  currentScript: any;
}
const AuthorsList: React.FC<ComponentProps> = ({ currentScript }) => {
  const authUser: any = useSelector((state: RootState) => state.user);

  const [entities, setEntities] = useState<any[]>([]);
  const [currentEntity, setCurrentEntity] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<any>(false);

  const { axiosInstance, api } = useAxiosInstance();
  const { numberToOrdinal } = useGlobalService();

  const fetchEntities = async () => {
    if (!currentScript) return;
    await axiosInstance
      .get(api(`manuscripts/${currentScript.id}/authors`))
      .then((res) => {
        setEntities(res.data.authors);
        if (res.data.authors.length === 0) createSelfAuthor();
        else setSortOrder(true);
      });
  };

  const handleDelete = (deleteID: number) => async () => {
    if (!currentScript) return;
    await axiosInstance
      .delete(api(`manuscripts/${currentScript.id}/authors/${deleteID}`))
      .then(() => {
        setEntities(entities.filter((r: any) => r.id !== deleteID));
      });
  };

  const updateAuthor = (author: any) => {
    // Check if the author already exists in the authors array
    const authorExists = entities.some(
      (existingAuthor: any) => existingAuthor.id === author.id
    );

    if (authorExists) {
      setEntities((prev: any) => {
        return prev.map((existingAuthor: any) =>
          existingAuthor.id === author.id ? author : existingAuthor
        );
      });
    } else setEntities([...entities, author]);

    if (author.corresponding_author) {
      setEntities((prev: any) => {
        return prev.map((existingAuthor: any) =>
          existingAuthor.id === author.id
            ? { ...existingAuthor }
            : { ...existingAuthor, corresponding_author: false }
        );
      });
    }
  };

  const createSelfAuthor = async () => {
    if (!currentScript) return;
    if (entities.length === 0 && authUser !== null) {
      await axiosInstance
        .post(api(`manuscripts/${currentScript.id}/authors`), {
          title: authUser.title || "Mr.",
          first_name: authUser.first_name,
          last_name: authUser.last_name,
          email: authUser.email,
          institution: authUser.institution_info.name,
          country: authUser.institution_info.country,
          degree: authUser.personal_info.degree,
          corresponding_author: true,
        })
        .then((response) => setEntities([response.data.author]));
    } else {
      setEntities(currentScript.authors);
    }
  };

  useEffect(() => {
    if (!currentScript) return;
    fetchEntities();
  }, [currentScript]);

  useEffect(() => {
    if (entities.length > 1 && sortOrder) {
      // Make a copy of the authors array to avoid mutating state directly
      const sortedAuthors = [...entities].sort((a: any, b: any) => {
        // Move corresponding_author to the desired position
        if (a.corresponding_author && !b.corresponding_author) return -1;
        if (!a.corresponding_author && b.corresponding_author) return 1;
        return 0; // Otherwise, keep the order
      });

      // Ensure corresponding_author is in the second position if authors > 1
      if (sortedAuthors.length > 1) {
        const correspondingAuthor = sortedAuthors.find(
          (a: any) => a.corresponding_author
        );
        const others = sortedAuthors.filter(
          (a: any) => !a.corresponding_author
        );

        // If a corresponding author exists, ensure it's in the second position
        if (correspondingAuthor) {
          const reorderedAuthors = [
            others[0],
            correspondingAuthor,
            ...others.slice(1),
          ];
          setEntities(reorderedAuthors);
        }
      } else {
        setEntities(sortedAuthors); // If only one author, just sort them
      }
      setSortOrder(false);
    }
  }, [entities, sortOrder]);

  return (
    <Fragment>
      <Card className="custom-card border border-primary">
        <Card.Header className="justify-content-between">
          <Card.Title>Current Author List</Card.Title>
          <BaseButton
            variant="outline-light"
            onClick={() => {
              setCurrentEntity(null);
              setVisible(true);
            }}
          >
            <i className="ri-add-line"></i> Add Another Author
          </BaseButton>
        </Card.Header>
        <Card.Body className="p-3">
          <Table className="table text-nowrap">
            <tbody className="table-warning">
              {entities.length == 0 && (
                <tr>
                  <td>There are currently no Authors in the list.</td>
                </tr>
              )}
              {entities.length > 0 &&
                entities.map((author: any, index: number) => (
                  <tr key={`author_${index}`}>
                    <td scope="col" width="20%">
                      <BaseButton
                        variant="primary-transparent"
                        className="btn btn-icon rounded-pill btn-wave me-4"
                        onClick={() => {
                          setCurrentEntity(author);
                          setVisible(true);
                        }}
                      >
                        <i className="ri-edit-line"></i>
                      </BaseButton>
                      {!author.corresponding_author && (
                        <BaseButton
                          variant="danger-transparent"
                          className="btn btn-icon rounded-pill btn-wave"
                          onClick={handleDelete(author.id)}
                        >
                          <i className="ri-delete-bin-6-line"></i>
                        </BaseButton>
                      )}
                    </td>
                    <td scope="col">
                      {/* Author's full name with title and degree */}
                      {`${author.title} ${author.first_name} ${author.last_name}, ${author.degree}`}

                      {/* Author role (Corresponding Author) */}
                      {author.corresponding_author
                        ? " [Corresponding Author]"
                        : " "}

                      {/* Author order (first, second, etc.) */}
                      {` [${numberToOrdinal(index + 1)} Author]`}

                      {/* Show "You" if the logged-in user is the author */}
                      {author.email === authUser.email && " [You]"}

                      {/* Institution */}
                      <br />
                      {author.institution}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <ScriptAuthor
        visible={visible}
        manuscriptId={currentScript && currentScript.id}
        currentEntity={currentEntity}
        onClose={() => setVisible(false)}
        onUpdate={(author) => {
          setSortOrder(true);
          updateAuthor(author);
        }}
        onDelete={(author) => {
          setSortOrder(true);
          handleDelete(author.id)();
          setVisible(false);
        }}
      />
    </Fragment>
  );
};

export default AuthorsList;
