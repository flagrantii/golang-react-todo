import React,{Component} from "react";
import axios from "axios";
import {List, Button, Input, Card, Form, Icon, Header} from "semantic-ui-react";

let endpoint = "http://localhost:4000";

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            value: ""
        };
    }
    componentDidMount() {
        this.getTodos();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        let {value} = this.state;

        if(value){
            axios.post(endpoint+"/api/task", {
                value,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                this.getTodos();
                this.setState({value: ""});
                console.log(res);
            });
        }
    }

    getTodos = () => {
        axios.get(`${endpoint}/api/todo`).then((res) => {
            if(res.data){
                const todos = res.data.map((todo) => (
                    <Card key={todo._id}>
                        <Card.Content>
                            <Card.Header>{todo.value}</Card.Header>
                            <Card.Meta>{todo.date}</Card.Meta>
                            <Card.Description>
                                <List>
                                    <List.Item>
                                        <Button icon color="green" onClick={() => this.updateTodo(todo._id)}>
                                            <Icon name="check" />
                                        </Button>
                                        <Button icon color="red" onClick={() => this.deleteTodo(todo._id)}>
                                            <Icon name="trash" />
                                        </Button>
                                    </List.Item>
                                </List>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                ));
                this.setState({todos});
            } else {
                this.setState({todos: []});
            }
        })
    }

    updateTodo = (id) => {
        axios.put(endpoint+"/api/task" +id,{
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res) => {
            console.log(res);
            this.getTodos();
        })
    }

    undoTodo = (id) => {
        axios.put(endpoint+"/api/task" +id,{
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res) => {
            console.log(res);
            this.getTodos();
        })
      
    }

    deleteTodo = (id) => {
        axios.delete(endpoint+"/api/task" +id,{
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res) => {
            console.log(res);
            this.getTodos();
            
        })
       
    }

    render(){
        return(
            <div>
                <div className="row">
                    <Header className="header" as="h2" color="blue">
                        To Do List
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input 
                        type="text" 
                        name="value" 
                        onChange={this.onChange} 
                        value={this.state.value} 
                        fluid
                        placeholder="Create Task" >
                        </Input>
                        <Button type="submit" color="blue">Create</Button>
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>{this.state.todos}</Card.Group>
                </div>
            </div>
        );
    }
}

export default ToDoList;

