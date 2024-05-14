import { useContext, useState } from "react"
import { EmployeeContext } from "../contexts/EmployeeContext"
import { Form, Button } from "react-bootstrap"

const AddEmployee = () => {

    const { dispatch } = useContext(EmployeeContext)
    const [newEmployee, setNewEmployee] = useState({
        name: '', email: '', address: '', phone: ''
    })
    const { name, email, address, phone } = newEmployee
    const onInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: 'add_employee', employee: {
                name, email, address, phone
            }
        })

        setNewEmployee({
            name: '', email: '', address: '', phone: ''
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Name"
                    name='name'
                    value={name}
                    onChange={e => onInputChange(e)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name='email'
                    value={email}
                    onChange={e => onInputChange(e)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    placeholder="Address"
                    name='address'
                    value={address}
                    onChange={e => onInputChange(e)}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name='phone'
                    value={phone}
                    onChange={e => onInputChange(e)}
                    required />
            </Form.Group>
            <Button
                variant="success"
                type="submit"
                className="text-center w-100"
                block
            >
                Add Employee
            </Button>
        </Form>
    )
}

export default AddEmployee