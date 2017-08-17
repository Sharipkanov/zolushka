import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IPaginationComponent} from '../../interfaces/pagination.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {

    @Input() pagination: IPaginationComponent = <IPaginationComponent>{};

    constructor(private _router: Router, private _activatedRouter: ActivatedRoute) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.renderPagination();
    }

    renderPagination() {
        if (Object.keys(this.pagination).length) {
            if (this.pagination.page.number + 1 < this.pagination.page.totalPages) {
                this.pagination._allowNext = true;
            }

            if (this.pagination.page.number > 0) {
                this.pagination._allowPrev = true;
            }
            this.pagination._pages = [];
            let startPage, endPage;
            if (this.pagination.page.totalPages <= 6) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = this.pagination.page.totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (this.pagination.page.number <= 3) {
                    startPage = 1;
                    endPage = 7;
                } else if (this.pagination.page.number + 3 >= this.pagination.page.totalPages) {
                    startPage = this.pagination.page.totalPages - 6;
                    endPage = this.pagination.page.totalPages;
                } else {
                    startPage = this.pagination.page.number - 2;
                    endPage = this.pagination.page.number + 4;
                    this.pagination._pages.push({
                        title: (1).toString(),
                        id: 1
                    });

                    if (startPage > 2) {
                        this.pagination._pages.push({
                            title: null,
                            id: null
                        });
                    }
                }
            }

            for (let i = startPage; i < endPage; i++) {
                this.pagination._pages.push({
                    title: (i).toString(),
                    id: i
                });
            }

            if (endPage < this.pagination.page.totalPages - 1) {
                this.pagination._pages.push({
                    title: null,
                    id: null
                });
            }

            if (endPage < this.pagination.page.totalPages) {
                this.pagination._pages.push({
                    title: (this.pagination.page.totalPages - 1).toString(),
                    id: this.pagination.page.totalPages - 1
                });
            }

        }
    }

    setPage(pageId: number) {
        const params = {...this._activatedRouter.snapshot.params};
        params.page = pageId - 1;

        this._router.navigate([{...params}]);

        this.renderPagination();
    }
}
