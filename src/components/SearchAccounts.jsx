import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function SearchAccounts(props) {

    const [search,setSearch]=useState({
        field:'',
        value:''
    })

    const [modal,setModal]=useState(false)

    const toggle=()=>{
        setModal(!modal)
        setSearch({
            field:'',
            value:''  
        })
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the selected field allows only numbers, validate the value
        if (search.field === 'accountNumber' || search.field === 'amount' || search.field === 'mobileNumber') {
            if (name === 'value' && isNaN(value)) {
                return; // Prevent non-numeric input
            }
        }

        setSearch((prevSearch) => ({
            ...prevSearch,
            [name]: value,
        }));
    };


    const searchAccounts = () => {
        if (!search.field) {
            toast.error('Please select a field to search!');
            return;
        }
        if (!search.value) {
            toast.error('Please enter a value to search!');
            return;
        }
        axios.post("http://localhost:8080/api/accounts/search",search).then((response) =>{
            const accounts=response.data
            console.log(accounts);
            
            if (accounts.length>0){
                props.accountList(response.data)
                toggle()
            }else{
                toast.error("No accounts found")
                toggle()
            }
        }).catch((error) =>{
            console.log(error);
            toast.error("Server unreachable")
            
        })
    }

    const getInputType = () => {
        if (search.field === 'accountNumber' || search.field === 'amount' || search.field === 'mobileNumber') {
            return 'number'; // Restrict to numeric input
        }
        return 'text'; // Default to text input
    };


  return (<>
    
    <Button className='mx-2' onClick={toggle}>Search</Button>

    {/* Seach Modal */}

    <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle} >Seach Account</ModalHeader>
        <ModalBody >
            <Form>
                <FormGroup >
                    <Label for='searchField' >Select Field</Label>
                    <Input
                        id="searchField"
                        name="field"
                        onChange={handleChange}
                        type="select"
                        value={search.field}
                        required
                        >
                        <option value="" disabled>
                            -- Select Field --
                        </option>
                        <option value="accountNumber">Account Number</option>
                        <option value="name">Name</option>
                        <option value="amount">Amount</option>
                        <option value="village">Village</option>
                        <option value="mobileNumber">Mobile Number</option>
                    </Input>
                </FormGroup>
                <FormGroup >
                    <Label for='searchValue' >Select Field</Label>
                    <Input
                        id="searchValue"
                        name="value"
                        onChange={handleChange}
                        placeholder="Enter value to search"
                        value={search.value}
                        type={getInputType()}
                    />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color='primary' onClick={searchAccounts}>Search</Button>
            <Button color='secondary' onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>




    </>)
}

export default SearchAccounts