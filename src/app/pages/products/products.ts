import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { Tab } from '../../components/tabs/tab.model';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner';
import { NoProductsCardComponent } from './no-products-card/no-products-card';
import { ProductCardComponent } from './product-card/product-card';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { TabsComponent } from '../../components/tabs/tabs';

import { selectProducts, selectProductsIsLoading } from '../../store/selectors/products.selectors';
import { getProducts } from '../../store/actions/products.actions';
import { ProductsStore } from '../../store/models/products.store.model';

import { Category } from '../../types/category.type';
import { isArrayNullOrEmpty, isStringNullOrEmpty } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-products',
  imports: [
    LoadingSpinnerComponent,
    ProductCardComponent,
    NoProductsCardComponent,
    SearchBarComponent,
    TabsComponent,
    AsyncPipe
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsPage implements OnInit {
  products = signal<Product[]>([]);
  isLoading$: Observable<boolean>;

  categoryTabs = computed(() => {
    const categories = ['All', ...Array.from(new Set(this.products().map(p => p.category)))];

    return categories.map((category, index) => {
      return {
        key: category,
        value: category,
        isSelected: index === 0
      } as Tab
    })
  })

  allProducts = computed(() => {
    return this.products()
               .filter(p => {
                  return (
                    (this.selectedCategory() === 'All' || p.category === this.selectedCategory())
                    && (
                      isStringNullOrEmpty(this.searchText())
                      || (
                        p.category.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.description.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.image.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.price.toString().includes(this.searchText().toLowerCase())
                        || p.title.toLowerCase().includes(this.searchText().toLowerCase())
                        || p.rating.count.toString().includes(this.searchText().toLowerCase())
                        || p.rating.rate.toString().includes(this.searchText().toLowerCase())
                      )
                    )
                  )
               })
    })

  hasProducts = computed(() => !isArrayNullOrEmpty(this.products()));

  private selectedCategory = signal<Category | string>('All');
  private searchText = signal<string>('');

  private router = inject(Router);

  constructor(private store: Store<ProductsStore>) {
    store.select(selectProducts).subscribe((products) => this.products.set(products));
    this.isLoading$ = store.select(selectProductsIsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(getProducts());
  }

  onSearchProducts(searchText: string) {
    this.searchText.set(searchText);
  }

  onCategorySelection(category: Category | string) {
    this.selectedCategory.set(category);
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['product', product.id]);
  }
}
