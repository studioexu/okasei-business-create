export const loadData = async (url: string) => {
	return await fetch(url)
		.then(res => res.json())
		.then(data => {
			return data
		})
		.catch(error => console.log(error))
}

export /**
 * delete the corresponding customer from the active customers, and put it in the deleted customers
 * @param e we pass the event to get the id of the customer
 */
const deleteItem = (customerId: string, url: string) => {
	//We get the customer information so we can POST the information in the deletedCustomers.
	fetch(url + customerId, {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' }
	})
		.then(res => res.json())
		.then(newData => {
			fetch('http://localhost:3000/deletedCustomers/', {
				method: 'POST',
				headers: { 'Content-type': 'application/json;charset=UTF-8' },
				body: JSON.stringify(newData)
			})
		})

	//We DELETE the customer from the "Customers" database.
	fetch(url + customerId, {
		method: 'DELETE',
		headers: { 'Content-type': 'application/json;charset=UTF-8' }
	})
		.then(res => res.json())
		.then(newData => {
			return newData
		})

	return loadData(url)
}
