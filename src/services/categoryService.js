import getCategories from "../../assets/categories";

class CategoryService {
  constructor() {
    this._categories = getCategories();
  }

  get categories() {
    return this._categories;
  }
}

const categoryService = new CategoryService();
export default categoryService;
