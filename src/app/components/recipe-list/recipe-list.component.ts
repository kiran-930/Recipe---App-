import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 9; 
  totalPages: number = 1;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data.recipes;
      this.filteredRecipes = this.recipes;
      this.calculateTotalPages();
    });
  }

  search(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchQuery) ||
      recipe.cuisine.toLowerCase().includes(this.searchQuery)
    );
    this.calculateTotalPages();
    this.setPage(1); // Reset to first page after search
  }

  paginate(array: any[], page_size: number, page_number: number): any[] {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  get paginatedRecipes(): any[] {
    return this.paginate(this.filteredRecipes, this.pageSize, this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredRecipes.length / this.pageSize);
  }
}