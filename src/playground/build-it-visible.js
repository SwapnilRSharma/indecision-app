console.log('app.js is running!')

const appRoot = document.getElementById('app')

class VisibilityToggle extends React.Component{
    constructor(props){
        super(props);
        this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
        this.state = {
            visibility: true
        };
    }
    handleVisibilityToggle(){
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleVisibilityToggle}>{this.state.visibility ? 'Hide Details' : 'Show Details'}</button>
                {this.state.visibility && <p>Here is some demo data.</p>}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, appRoot)