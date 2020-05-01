import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';
import Modal from 'react-modal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                    return optionToRemove != option;
                }),
            };
        });
    };

    handlePick = () => {
        const random = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[random];
        this.setState(() => ({ selectedOption: option }))
    };

    handleCloseModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    handleAddOption = (option) => {
        if (!option) {
            return "Enter valid option.";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists.";
        }
        this.setState((prevState) => ({
            options: prevState.options.concat(option),
        }));
    };

    componentDidMount() {
        try {
            Modal.setAppElement('body')

            const json = localStorage.getItem("options");
            const options = JSON.parse(json);



            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) { }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    };

    componentDidUnmout() {
        console.log("componentDidUnmout");
    };


    render() {
        const subtitle = "Put your life in the hand of a computer.";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleCloseModal={this.handleCloseModal}
                />
            </div>
        );
    }
}