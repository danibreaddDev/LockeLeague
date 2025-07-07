import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-locke',
  imports: [RouterLink,RouterOutlet],
  template: `<main class="h-screen p-5 md:p-20 container mx-auto font-text">
      <section class="flex flex-col gap-5 h-full">
        <a routerLink="/lockes">Volver</a>
        <div class="grid-container">
          <div class="nav-locke border border-slate-300 rounded-3xl font-title h-fit md:h-auto ">
            <div class="flex flex-row md:flex-col items-center">
              <a [routerLink]="'/locke/' + testId" class="text-muted text-secondary">
                <div class="link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M23 6v5h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1H9v-1H8v-1H7v-1H6v-1H5v-1H4v-1H3v-1H2v-1H1V6h1V5h1V4h1V3h6v1h1v1h2V4h1V3h6v1h1v1h1v1z"
                    />
                  </svg>
                  <span>Informacion General</span>
                </div>
              </a>

              <a routerLink="rules" class="text-muted text-secondary">
                <div class="link">Reglas</div>
              </a>

              <a routerLink="tournaments" class="text-muted text-secondary">
                <div class="link">Torneos</div>
              </a>
            </div>
          </div>
           <div class="content border border-slate-300 rounded-3xl">
            <router-outlet/>
           </div>
        </div>
      </section>
      </main>
            `,
  styles: `.grid-container {
  display: grid;
  width: 100%;
  height: 100%;
  gap: 10px;
  grid-template-columns: 0.2fr 0.8fr;
  grid-row: auto;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}
.nav-locke {
  overflow: hidden;
  width: 100%;
  div {
    width: 100%;
  }

  a {
    width: 100%;
    font-size: 10px;
  }
  .link {
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 50px;

    &:hover {
      background: #e2e0e0;
    }
  }
}

.content {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}`
})
export class Locke {
  testId: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.testId);
    });
  }
}
