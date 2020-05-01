class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: props.options
        }
    }

    handleDeleteOptions(){
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove){
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                    return optionToRemove != option;
                })
            };
        });
    }

    handlePick(){
        const random = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[random]
        alert(option)
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid option.'
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists.'
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    render(){
        const subtitle = 'Put your life in the hand of a computer.'

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options : ['vsekjnfd', 'sifnerkl']
}

class Header extends React.Component{
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.props && <h3>{this.props.subtitle}</h3>}
            </div>
        );
    }
}

Header.defaultProps = {
    title: 'Indecision App'
}

class Action extends React.Component{
    render(){
        return (
            <div>
                <button 
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >
                What should i do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component{
    render(){
        const options = this.props.options

        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    options.map((option) => (
                        <Option 
                            key={option} 
                            optionText={option}
                            handleDeleteOption={this.props.handleDeleteOption}
                        />
                    ))
                }
            </div>
        );
    }
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error: error }));
        e.target.elements.option.value = '';
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))