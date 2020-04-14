import getCategories from '../../assets/categories';

class CategoryService {

    constructor() {
        this._testingCategories = getCategories();
    }

    get testingCategories() {
        return this._testingCategories;
    }
}

const categoryService = new CategoryService();
export default categoryService;
