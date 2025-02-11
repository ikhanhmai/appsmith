import React from "react";
import { ControlProps } from "components/formControls/BaseControl";
import {
  EvaluationError,
  PropertyEvaluationErrorType,
} from "utils/DynamicBindingUtils";
import { TooltipComponent as Tooltip } from "design-system";
import {
  FormLabel,
  FormInputHelperText,
  FormInputAnchor,
  FormInputErrorText,
  FormInfoText,
  FormSubtitleText,
  FormEncrytedSection,
} from "components/editorComponents/form/fields/StyledFormComponents";
import { FormIcons } from "icons/FormIcons";
import { FormControlProps } from "./FormControl";

interface FormConfigProps extends FormControlProps {
  children: JSX.Element;
  configErrors: EvaluationError[];
}
// top contains label, subtitle, urltext, tooltip, dispaly type
// bottom contains the info and error text
// props.children will render the form element
export default function FormConfig(props: FormConfigProps) {
  let top, bottom;

  if (props.multipleConfig?.length) {
    top = (
      <div style={{ display: "flex" }}>
        {props.multipleConfig?.map((config) => {
          return renderFormConfigTop({ config });
        })}
      </div>
    );
    bottom = props.multipleConfig?.map((config) => {
      return renderFormConfigBottom({ config });
    });
    return (
      <>
        {top}
        {props.children}
        {bottom}
      </>
    );
  }

  return (
    <div>
      <div
        style={{
          // TODO: replace condition with props.config.dataType === "TOGGLE"
          // label and form element is rendered side by side for CHECKBOX and SWITCH
          display:
            props.config.controlType === "SWITCH" ||
            props.config.controlType === "CHECKBOX"
              ? "flex"
              : "block",
        }}
      >
        {props.config.controlType === "CHECKBOX" ? (
          <>
            {props.children}
            {renderFormConfigTop({ config: props.config })}
          </>
        ) : (
          <>
            {renderFormConfigTop({ config: props.config })}
            {props.children}
          </>
        )}
      </div>
      {renderFormConfigBottom({
        config: props.config,
        configErrors: props.configErrors,
      })}
    </div>
  );
}
function renderFormConfigTop(props: { config: ControlProps }) {
  const {
    encrypted,
    isRequired,
    label,
    nestedFormControl,
    subtitle,
    tooltipText = "",
    url,
    urlText,
  } = { ...props.config };
  return (
    <React.Fragment key={props.config.label}>
      {!nestedFormControl && // if the form control is a nested form control hide its label
        (label?.length > 0 || encrypted || tooltipText || subtitle) && (
          <FormLabel config={props.config}>
            <p className="label-icon-wrapper">
              {label} {isRequired && "*"}
              {encrypted && (
                <FormEncrytedSection>
                  <FormIcons.LOCK_ICON height={12} keepColors width={12} />
                  <FormSubtitleText config={props.config}>
                    Encrypted
                  </FormSubtitleText>
                </FormEncrytedSection>
              )}
              {tooltipText && (
                <Tooltip content={tooltipText} hoverOpenDelay={1000}>
                  <FormIcons.HELP_ICON height={16} width={16} />
                </Tooltip>
              )}
            </p>
            {subtitle && (
              <FormInfoText config={props.config}>{subtitle}</FormInfoText>
            )}
          </FormLabel>
        )}
      {urlText && (
        <FormInputAnchor href={url} target="_blank">
          {urlText}
        </FormInputAnchor>
      )}
    </React.Fragment>
  );
}

function renderFormConfigBottom(props: {
  config: ControlProps;
  configErrors?: EvaluationError[];
}) {
  const { controlType, info } = { ...props.config };
  return (
    <>
      {info && (
        <FormInputHelperText
          addMarginTop={controlType === "CHECKBOX" ? "8px" : "2px"} // checkboxes need a higher margin top than others form control types
        >
          {info}
        </FormInputHelperText>
      )}
      {props.configErrors &&
        props.configErrors.length > 0 &&
        props.configErrors
          .filter(
            (error) =>
              error.errorType === PropertyEvaluationErrorType.VALIDATION,
          )
          .map((error, index) => (
            <FormInputErrorText key={index}>
              {`* ${error?.errorMessage}`}
            </FormInputErrorText>
          ))}
    </>
  );
}
