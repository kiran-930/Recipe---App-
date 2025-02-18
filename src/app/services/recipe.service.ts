import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://dummyjson.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getRecipesByMealType(mealType: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.recipes.filter((recipe: any) => recipe.mealType === mealType))
    );
  }
}
