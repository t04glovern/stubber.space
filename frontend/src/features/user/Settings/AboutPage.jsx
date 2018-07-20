import React from "react";
import { Button, Divider, Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import RadioInput from "../../../app/common/form/RadioInput";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import PlaceInput from "../../../app/common/form/PlaceInput";
import SelectInput from "../../../app/common/form/SelectInput";

const interests = [
  { key: "alternative", text: "Alternative", value: "Alternative" },
  { key: "blues", text: "Blues", value: "Blues" },
  { key: "classical", text: "Classical", value: "Classical" },
  { key: "country", text: "Country", value: "Country" },
  { key: "dance", text: "Dance", value: "Dance" },
  { key: "easylistening", text: "Easy Listening", value: "Easy Listening" },
  { key: "electronic", text: "Electronic", value: "Electronic" },
  { key: "europeanfolkpop", text: "European (Folk Pop)", value: "European (Folk Pop)" },
  { key: "hiphoprap", text: "Hip Hop / Rap", value: "Hip Hop / Rap" },
  { key: "indiepop", text: "Indie Pop", value: "Indie Pop" },
  { key: "gospel", text: "Gospel", value: "Gospel" },
  { key: "asianpop", text: "Asian Pop", value: "Asian Pop" },
  { key: "jazz", text: "Jazz", value: "Jazz" },
  { key: "latin", text: "Latin", value: "Latin" },
  { key: "newage", text: "New Age", value: "New Age" },
  { key: "opera", text: "Opera", value: "Opera" },
  { key: "pop", text: "Pop", value: "Pop" },
  { key: "rbsoul", text: "R&B / Soul", value: "R&B / Soul" },
  { key: "reggae", text: "Reggae", value: "Reggae" },
  { key: "rock", text: "Rock", value: "Rock" },
  { key: "singerfolk", text: "Singer (Folk)", value: "Singer (Folk)" },
  { key: "worldmusicbeats", text: "World Music / Beats", value: "World Music / Beats" }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="single"
            label="Single"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="relationship"
            label="Relationship"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="Married"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          options={{ types: ["(regions)"] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update Profile"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
