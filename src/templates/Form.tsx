import * as Yup from "yup";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import React, { FC } from "react";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import { roles } from "../constants/UserConstant";

const MemberForm: FC = () => {
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
                  .required("email required")
                  .email("Enter valid email"),
                role: Yup.string()
                  .required("role required")
                  .oneOf(roles, "The role you chose does not exist"),
              })
            )
            .min(1, "Minimum of 1 memeber"),
        })}
        onSubmit={(values: any) => {
          alert(JSON.stringify(values));
        }}
        render={({ values, errors }) => (
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
                            <Field
                              placeholder="user email"
                              name={`users.${index}.email`}
                              component={Input}
                            />
                            <ErrorMessage name={`users.${index}.email`} />

                            <br />
                            <Field
                              placeholder="user role"
                              name={`users.${index}.role`}
                              component={Select}
                              options={roles}
                            />
                            <ErrorMessage name={`users.${index}.role`} />
                            <br />

                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
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
                    >
                      Add Member
                    </button>
                    <br />
                    <br />
                    <br />
                    <div>
                      <button type="submit">Invite Members</button>
                    </div>
                  </div>
                );
              }}
            />
            <hr />
          </Form>
        )}
      />
    </div>
  );
};
export default MemberForm;