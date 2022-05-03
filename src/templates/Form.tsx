import * as Yup from "yup";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import React, { FC, useState } from "react";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import { roles } from "../constants/UserConstant";
import { useAppDispatch } from "../hooks/user.hooks";
import { inviteUsers } from "../store/user-actions";
import styled from "styled-components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

const StyledWrapper = styled.div`
  margin: auto;
  width: 50%;
  background: #f7f7f7;
  padding: 10px;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 360px 150px 80px;
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
  const [addedState, setAddedState] = useState("");

  return (
    <div>
      <Formik
        initialValues={{
          users: [
            {
              email: "aditi@email.com",
              role: "Manager",
            },
          ],
        }}
        validationSchema={Yup.object({
          users: Yup.array()
            .of(
              Yup.object().shape({
                email: Yup.string()
                  .required("Field can't be empty")
                  .email("Enter valid email"),
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
        }}
        render={({ values, errors }: any) => (
          <Form>
            <h5>Form </h5>
            <FieldArray
              name="users"
              render={(arrayHelpers: any) => {
                const users = values.users;
                return (
                  <div>
                    {users && users.length > 0
                      ? users.map((user: any, index: number) => (
                          <div key={index}>
                            <StyledWrapper>
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
                                  <ErrorMessage name={`users.${index}.role`} />
                                </div>
                                <div>
                                  <StyledButton
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    data-testid={`remove-button-${index}`}
                                  >
                                    <Icon icon={faTrash} />
                                  </StyledButton>{" "}
                                </div>
                              </StyledContainer>
                            </StyledWrapper>
                            <br />
                            <br />
                          </div>
                        ))
                      : null}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          email: "",
                        })
                      }
                      data-testid="add-button"
                    >
                      Add Member
                    </button>
                    <br />
                    <br />
                    <br />
                    <div>
                      <button type="submit" data-testid="submit-button">
                        Invite Members
                      </button>
                    </div>

                    {/* <div>{errors.users}</div> */}
                  </div>
                );
              }}
            />
            <hr />
          </Form>
        )}
      />
      {addedState}
    </div>
  );
};
export default MemberForm;
