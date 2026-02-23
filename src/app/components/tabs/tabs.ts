import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, OnInit, output, QueryList, ViewChildren, signal, computed } from '@angular/core';

import { Tab } from './tab.model';
import { isPropertyNull } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class TabsComponent {
  tabs = input.required<Tab[]>();
  selected = output<Tab>();

  allTabs = computed(() => {
    if (isPropertyNull(this.selectedTab())) return [...this.tabs()];

    return [
      ...this.tabs()
             .map(tab => {
                return {
                  ...tab,
                  isSelected: tab.key === this.selectedTab()?.key
                } as Tab
              })
      ];
  });

  private selectedTab = signal<Tab | undefined>(undefined);

  @ViewChildren('tabButton')
  private tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  onTabSelection(selectedTab: Tab) {
    this.selectedTab.set(selectedTab);
    this.selected.emit(selectedTab);
  }

  onKeydown(event: KeyboardEvent, index: number) {
    const tabsArray = this.tabButtons.toArray();
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabsArray.length;
        break;

      case 'ArrowLeft':
        newIndex = (index - 1 + tabsArray.length) % tabsArray.length;
        break;

      case 'Home':
        newIndex = 0;
        break;

      case 'End':
        newIndex = tabsArray.length - 1;
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onTabSelection(this.allTabs()[index]);
        return;

      default:
        return;
    }

    event.preventDefault();
    this.tabButtons.get(newIndex)?.nativeElement.focus();
  }

}
