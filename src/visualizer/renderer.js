/**
 * Render the adaptive card for the given payload.
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    Alert,
    Linking,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import * as ACData from 'adaptivecards-templating';
import AdaptiveCard from '../adaptive-card';
import { RatingRenderer } from './rating-renderer';
import { Registry } from '../components/registration/registry';
import * as Utils from '../utils/util';
import * as Constants from './constants';
import { CustomActionRenderer } from './custom-action-renderer';
import { CustomTextBlockRenderer } from './custom-text-block';
import { CustomActionButtonRenderer } from './custom-action-button';
import { CustomImageRenderer } from './custom-image';

export default class Renderer extends React.Component {

    static propTypes = {
        isDataBinding: PropTypes.bool
    };

    static defaultProps = {
        isDataBinding: false,
        hideHeader: false
    };

    state = {
        isJSONVisible: false
    }

    customHostConfig = {
        hostCapabilities: {
            adaptiveCards: '1.2',
            acTest: '1.3'
        },
        fontFamily: "Helvetica",
        supportsInteractivity: true,
        actions: {
            actionsOrientation: "Horizontal",
            actionAlignment: "Stretch"
        },
        fontSizes: {
            small: 12,
            default: 14,
            medium: 17,
            large: 21,
            extraLarge: 26
        },
        spacing: {
            none: 0,
            small: 0, //3,
            default: 0, //8,
            medium: 0, //20,
            large: 0, //30,
            extraLarge: 0, //40,
            padding: 0
        },
        separator: {
            lineThickness: 1,
            lineColor: "#d41515"
        },
        containerStyles: {
            default: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            },
            emphasis: {
                "backgroundColor": "#007847",
                "borderColor": "#FF000000",
                "borderThickness": 2,
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            },
            good: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                },
            },
            warning: {
                "backgroundColor": "#007847",
                "borderColor": "#FF000000",
                "borderThickness": 2,
                "foregroundColors": {
                    "default": {
                        "default": "#FFFFFF",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#FFFFFF",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#FFFFFF",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#FFFFFF",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#FFFFFF",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                },
            },
            attention: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            },
            accent: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            },
            dark: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#333333",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            },
            light: {
                "backgroundColor": "#007847",
                "foregroundColors": {
                    "default": {
                        "default": "#FFFFFF",
                        "subtle": "#EE333333"
                    },
                    "accent": {
                        "default": "#2E89FC",
                        "subtle": "#882E89FC"
                    },
                    "good": {
                        "default": "#028A02",
                        "subtle": "#DD027502"
                    },
                    "warning": {
                        "default": "#B75C00",
                        "subtle": "#DDB75C00"
                    },
                    "attention": {
                        "default": "#ED0000",
                        "subtle": "#DDED0000"
                    },
                    "dark": {
                        "default": "#000000",
                        "subtle": "#EE333333"
                    },
                    "light": {
                        "default": "#FFFFFF",
                        "subtle": "#DDFFFFFF"
                    }
                }
            }
        },
        adaptiveCard: {
            allowCustomStyle: true
        },
    }

    customThemeConfig = {
        button: {
            backgroundColor: '#66BB6A'
        }
    }

    constructor(props) {
        super(props);
        this.payload = props.payload;
        this.data = props.data;
        this.onModalClose = props.onModalClose;
    }

    bindPayloadWithData() {
        // Create a Template instance from the template payload
        var template = new ACData.Template(this.payload);

        var context = {};
        if (this.data instanceof Function) {
            context.$root = this.data();
        } else if (typeof (this.data) === 'string') {
            try {
                context.$root = JSON.parse(this.data);
            } catch (e) {
                throw Error("Invalid data format");
            }
        } else if (typeof (this.data) == 'object') {
            context.$root = this.data;
        } else if (this.data) {
            throw Error("Invalid data format");
        }

        // Create a data binding context, and set its $root property to the
        // data object to bind the template to


        // "Expand" the template - this generates the final payload for the Adaptive Card,
        // ready to render with this payload
        this.payload = template.expand(context);
    }

    render() {
        //Register Custom Components
        Registry.getManager().registerComponent('RatingBlock', RatingRenderer);

        //Register Custom Text Block Components
        // Registry.getManager().registerComponent('TextBlock', CustomTextBlockRenderer);

        //Register Custom Action Button Components
        Registry.getManager().registerComponent('CustomActionButton', CustomActionButtonRenderer);

        //Register Custom Image Components
        Registry.getManager().registerComponent('CustomImage', CustomImageRenderer);

        //Register Custom Actions
        Registry.getManager().registerComponent('Action.Custom', CustomActionRenderer);
        let { isJSONVisible, hideHeader } = this.state;

        //We will update the payload with method bindPayloadWithData, if isDataBinding is true.
        this.props.isDataBinding && this.bindPayloadWithData()
        //<<Button title="Close" onPress={this.onModalClose} />
        return (
            <View style={styles.container}>
                {hideHeader ?
                    <View style={styles.header}>
                        <Text style={styles.title}>Adaptive Card</Text>
                        <Button title={isJSONVisible ? 'Card' : 'Json'} onPress={this.toggleJSONView} />
                    </View>
                    :
                    null
                }
                {isJSONVisible ?
                    <ScrollView contentContainerStyle={styles.jsonContainer}>
                        <Text style={{ fontFamily: 'Courier New' }}>
                            {JSON.stringify(this.props.payload, null, '  ')}
                        </Text>
                    </ScrollView>
                    :
                    <AdaptiveCard
                        payload={this.payload}
                        onExecuteAction={this.onExecuteAction}
                        hostConfig={this.customHostConfig}
                        themeConfig={this.customThemeConfig}
                        onParseError={this.onParseError}
                        // cardScrollEnabled={false} //we can also set the scrollEnabled for the adaptive card. Default value is true
                        // contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} //we can also set the contentContainer Style for the adaptive card
                        // containerStyle={{width:100, height: 100, flexGrow:1, backgroundColor: 'lightblue'}} //we can also set the style for the adaptive card
                        // contentHeight={500} //we can also set the height of the adaptive card
                        ref="adaptiveCardRef" />
                }
            </View>
        );
    }

    /**
     * @description Handler for the payload actions.
     * @param {object} actionObject - Details and data about the action.
     */
    onExecuteAction = (actionObject) => {
        if (actionObject.type === "Action.Submit") {
            Alert.alert(
                'Rendered Submit',
                JSON.stringify(actionObject.data),
                [
                    { text: actionObject.title, onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else if (actionObject.type === "Action.Execute") {
            Alert.alert(
                'Rendered Univeral Action',
                JSON.stringify(actionObject.data) + "\n Verb is " + actionObject.verb,
                [
                    { text: actionObject.title, onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else if (actionObject.type === "Action.OpenUrl" && !Utils.isNullOrEmpty(actionObject.url)) {
            Linking.canOpenURL(actionObject.url).then(supported => {
                if (supported) {
                    Linking.openURL(actionObject.url).catch(() => {
                        console.log("Failed to open URI: " + actionObject.url)
                        this.alertAction(actionObject);
                    });
                } else {
                    console.log("Don't know how to open URI: " + actionObject.url);
                    this.alertAction(actionObject);
                }
            });
        } else this.alertAction(actionObject);

    }

    /**
     * @description Alert the action object 
     * @param {object} actionObject - Details and data about the action.
     */
    alertAction = (actionObject) => {
        Alert.alert(
            'Action',
            JSON.stringify(actionObject.data) + "\ntype: " + actionObject.type,
            [
                { text: "Okay", onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    /**
     * @description Handler for payload parsing errors(if any)
     * @param {object} errorObject - Details about the error.
     */
    onParseError = (errorObject) => {
        console.log("Error", JSON.stringify(errorObject.message));
    }

    /**
     * @description Toggle the view state between card and its payload.
     */
    toggleJSONView = () => {
        this.setState({
            isJSONVisible: !this.state.isJSONVisible
        })
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 1,
                marginBottom: Constants.IosBottomMargin, //Adaptive card starts from 84 pixel so we gave margin bottom as 84. Its purely for our renderer app, it will not impact adaptive card.
            },
            android: {
                marginBottom: Constants.AndroidBottomMargin
            }
        }),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center'
    },
    jsonContainer: {
        backgroundColor: '#f7f7f7',
    }
});