import React, { Component } from 'react'
import UserService from '../services/UserService'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

  componentDidMount(){
        UserService.getUsers().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Lista de usuarios</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Agregar usuario</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Nombre de usuario</th>
                                    <th> Apellido de usuario</th>
                                    <th> Email Id</th>
                                    <th> Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> { user.firstName} </td>   
                                             <td> {user.lastName}</td>
                                             <td> {user.email}</td>
                                             <td>
                                                 <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Actualizar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Eliminar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewUser(user.id)} className="btn btn-info">Detalles </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListUserComponent
