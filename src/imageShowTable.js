import React, {Component} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class ImageShowTable extends Component {
    constructor() {
        super();
        this.state = {
            images : ['car1','book2','computer3','car2','computer4','book3','car3','computer2','car4','book1','computer1','car5','book5','computer5','book4'],
            currentPage: 1,
            imagesPerPage: 5
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
      
    
    render() {
        const { images, currentPage, imagesPerPage } = this.state;
        let currentimages;

        const indexOfLastPage = currentPage * imagesPerPage;
        const indexOfFirstPage = indexOfLastPage - imagesPerPage;

        const searchImages = [];
        const params = new URLSearchParams(window.location.search);
        const searchBoxValue = params && params.get('searchImageBox') ?  params.get('searchImageBox') : '';
        
        // Logic for displaying images
        if(searchBoxValue){
            images.map((item, i) =>
                (item.length-1) == searchBoxValue.length && (item.substr(0,searchBoxValue.length) == searchBoxValue ? searchImages.push(item) : '')
            );
            currentimages = searchImages.slice(indexOfFirstPage, indexOfLastPage);
        }else{
            currentimages = images.slice(indexOfFirstPage, indexOfLastPage);
        }
        
        const renderimages = currentimages.map((imageName, index) => {
            return <li key={index}>
                <LazyLoadImage
                alt={imageName}
                src={"./images/" + imageName + ".jpg"} alt={imageName} />
            </li>;
        });
    
        // Logic for displaying page numbers
        let pageNumbers = [];
        if(searchBoxValue){
            for (let i = 1; i <= Math.ceil(searchImages.length / imagesPerPage); i++) {
                pageNumbers.push(i);
            }
        }else{
            for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
                pageNumbers.push(i);
            }
        }
    
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                key={number}
                id={number}
                onClick={this.handleClick}
                className = {this.state.currentPage == number ? 'active' : '' }
                >
                    {number}
                </li>
            );
        });
    
        return (
            <div>
                <ul id='showImages'>
                    {renderimages}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default ImageShowTable;