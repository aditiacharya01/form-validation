import * as Yup from "yup";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import React, { FC, useRef, useState } from "react";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import { roles } from "../constants/UserConstant";
import { useAppDispatch } from "../hooks/user.hooks";
import { inviteUsers } from "../store/user-actions";
import styled from "styled-components";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";
import Button from "../atoms/Buttons";

const StyledWrapper = styled.div`
  margin: auto;
  width: 50%;
  background: #f7f7f7;
  padding: 29px;
  border-radius: 4px;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 30% 10%;
  text-align: left;
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  margin-top: 26px;
`;

const StyledErrorMessage = styled.div`
  color: #e91f1f;
  font-size: 14px;
  margin-top: 6px;
`;

const MemberForm: FC = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>();
  const [addedState, setAddedState] = useState("");
  const [userArray, setuserArray] = useState<{ email: string; role: number }[]>(
    []
  );

  return (
    <div>
      <Formik
        innerRef={formRef}
        initialValues={{
          users: [
            {
              email: "",
              role: "",
            },
          ],
        }}
        validationSchema={Yup.object({
          users: Yup.array()
            .of(
              Yup.object().shape({
                email: Yup.string()
                  .required("Field can't be empty")
                  .email("Enter valid email")
                  .test(
                    "validator-custom-name",
                    (value: any, { createError, path }) => {
                      let errIndex: string[] = [];

                      userArray.forEach((user: any, index) => {
                        if (user.email === value) {
                          errIndex.push(`users[${index + 1}].email`);
                        }
                      });

                      const filteredPath = errIndex.filter(
                        (err) => err === path
                      );

                      if (filteredPath.length > 0)
                        return createError({
                          path: filteredPath[0],
                          message: "Email already exists",
                        });
                      return true;
                    }
                  ),
                role: Yup.string()
                  .required("Field can't be empty")
                  .oneOf(roles, "The role you chose does not exist"),
              })
            )
            .min(1, "At least one member is required"),
        })}
        onSubmit={(values: any) => {
          dispatch(inviteUsers(values));
          setAddedState("Successfully added member");

          setTimeout(() => {
            setAddedState("");
          }, 3000);
        }}
        render={({ values, errors }: any) => (
          <Form>
            <h5>Form </h5>
            <FieldArray
              name="users"
              render={(arrayHelpers: any) => {
                const users = values.users;
                console.log("error", errors.users);

                return (
                  <div>
                    <StyledWrapper>
                      {users && users.length > 0
                        ? users.map((user: any, index: number) => (
                            <div key={index}>
                              <StyledContainer>
                                <div>
                                  <Field
                                    placeholder="user email"
                                    name={`users.${index}.email`}
                                    component={Input}
                                    label="Email"
                                    id={`users-email-${index}`}
                                  />
                                  <StyledErrorMessage>
                                    <ErrorMessage
                                      name={`users.${index}.email`}
                                    />
                                  </StyledErrorMessage>
                                </div>

                                <div>
                                  <Field
                                    placeholder="user role"
                                    name={`users.${index}.role`}
                                    component={Select}
                                    options={roles}
                                    label="Role"
                                    id={`users-role-${index}`}
                                  />
                                  <StyledErrorMessage>
                                    <ErrorMessage
                                      name={`users.${index}.role`}
                                    />{" "}
                                  </StyledErrorMessage>
                                </div>
                                <div style={{ marginLeft: "auto" }}>
                                  <StyledButton
                                    type="button"
                                    onClick={() => {
                                      if (index === 0) {
                                        alert(
                                          "At lease one member should be present"
                                        );
                                      } else {
                                        arrayHelpers.remove(index);
                                      }
                                    }}
                                    data-testid={`remove-button-${index}`}
                                  >
                                    <Icon icon={faTrash} />
                                  </StyledButton>{" "}
                                </div>
                              </StyledContainer>

                              <br />
                              <br />
                            </div>
                          ))
                        : null}
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            name: "",
                            email: "",
                          });
                          setuserArray(users);
                        }}
                        id="add-button"
                        name="Add another"
                        icon="+"
                        buttonType="secondary"
                      ></Button>
                      <div>
                        <Button
                          type="submit"
                          id="submit-button"
                          name="INVITE MEMBERS"
                          buttonType="primary"
                        ></Button>
                      </div>
                    </StyledWrapper>
                  </div>
                );
              }}
            />
            <hr />
          </Form>
        )}
      />
      {addedState !== "" && addedState}
    </div>
  );
};
export default MemberForm;
