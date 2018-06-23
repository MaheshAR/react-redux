import React, {Component} from 'react';

class DummyComponent extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			items: [
				{
					id: 0,
					text1: 'aaa',
					text2: 'bbb',
					innerText: 'hai1',
					hideChild: true
				},
				{
					id: 1,
					text1: 'aaa',
					text2: 'bbb',
					innerText: 'hai2',
					hideChild: true
				},
				{
					id: 2,
					text1: 'aaa',
					text2: 'bbb',
					innerText: 'hai3',
					hideChild: true
				},
				{
					id: 3,
					text1: 'aaa',
					text2: 'bbb',
					innerText: 'hai4',
					hideChild: true
				}
			]
		};

		this.onHeaderClick = this.onHeaderClick.bind(this);
	}

	onHeaderClick(item){
		const index = this.state.items.findIndex((obj) => obj.id === item.id);
		const newItems = [...this.state.items.filter((obj) => obj.id !== item.id)];

		item.hideChild = !item.hideChild;

		this.setState({items: newItems.slice(0, index).concat([item]).concat(newItems.slice(index))});
	}

	render(){
		return(
				<ul>
					{
						this.state.items.map((item, index) => {
							return (
									<li key = {index}>
										<div className="cheader" onClick={this.onHeaderClick.bind(this, item)}>
											<span>{item.text1}</span>
											<span>{item.text2}</span>
										</div>
										{
											!item.hideChild &&
											<div className="child">
												<span>{item.innerText}</span>
											</div>
										}
										
									</li>
								);
						})
					}
				</ul>
			);
	}
}

export default DummyComponent