import * as React from "react";
import { Button } from "../../../../react-common/components/controls/Button";
import CodeValidationResult = pxt.tutorial.CodeValidationResult;

interface TutorialValidationErrorMessageProps {
    onContinueClicked: () => void;
    onReturnClicked: () => void;
    validationFailures: CodeValidationResult[];
    tutorialId: string;
    currentStep: number;
}

export function TutorialValidationErrorMessage(
    props: TutorialValidationErrorMessageProps
) {
    const [showHint, setShowHint] = React.useState(false);

    const onShowHintClicked = () => {
        if (!showHint) {
            pxt.tickEvent("codevalidation.showhint", {
                tutorial: props.tutorialId,
                step: props.currentStep,
            });
            setShowHint(true);
        }
    };

    const hintsExist = !!props.validationFailures.find(f => f.hint && f.hint != "");

    const hintContent = hintsExist ? (
        <div className="tutorial-validation-error-hint">
            {props.validationFailures.map((f, i) => {
                return f.hint ? <div key={i}>{f.hint}</div> : null;
            })}
        </div>
    ) : undefined;

    const showHintLabel = lf("Show Hint");
    const continueAnywayLabel = lf("Continue Anyway");
    const closeLabel = lf("Close");
    return (
        <div className="tutorial-validation-error-container">
            <Button
                className="tutorial-validation-error-close"
                onClick={props.onReturnClicked}
                title={closeLabel}
                ariaLabel={closeLabel}
                rightIcon="fas fa-times-circle"
            />
            {showHint ? hintContent : (
                <div className="tutorial-validation-error-body">
                    <span role="img" aria-label={lf("Ladybug")} className="tutorial-validation-error-emoji">🐞</span>
                    <div className="tutorial-validation-error-inner">
                        <strong>{lf("Is there a bug?")}</strong>
                        <p>{lf("This code doesn't look the way we expected.")}</p>
                        <div className="tutorial-validation-error-controls">
                            {hintsExist && (
                                <Button
                                    className="teal"
                                    leftIcon="fas fa-lightbulb"
                                    onClick={onShowHintClicked}
                                    title={showHintLabel}
                                    ariaLabel={showHintLabel}
                                    label={showHintLabel}
                                />
                            )}
                            <Button
                                className="teal inverted"
                                leftIcon="fas fa-arrow-circle-right"
                                onClick={props.onContinueClicked}
                                title={continueAnywayLabel}
                                ariaLabel={continueAnywayLabel}
                                label={continueAnywayLabel}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
