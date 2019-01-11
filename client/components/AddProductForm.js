import React from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'
import {fetchAllCategories} from '../store/categories'
import {Redirect} from 'react-router-dom'

class AddProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      description: '',
      quantity: '',
      categoryId: '',
      redirectHome: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postProduct(this.state)
    this.setState({redirectHome: true})
  }

  render() {
    const {name, price, description, quantity, redirectHome} = this.state
    const {categories} = this.props

    if (redirectHome) return <Redirect to="/" />

    return (
      <div>
        <h3>ADD PRODUCT</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <p />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
          <p />
          <label>Description</label>
          <textarea
            rows="5"
            cols="100"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <p />
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
          />
          <p />
          <select name="categoryId" onChange={this.handleChange}>
            <option>--</option>
            {categories &&
              categories.map(category => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                )
              })}
          </select>

          <p />
          <button type="submit">Add Product</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postProduct: newProduct => dispatch(postProduct(newProduct)),
    fetchAllCategories: () => dispatch(fetchAllCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
