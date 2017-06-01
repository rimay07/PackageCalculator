import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement }                      from '@angular/core';
import { BaseRequestOptions,  ConnectionBackend, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AppComponent}  from './app.component';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { Globals } from './globals';


describe('Application Settings', ()=> {
     let comp:       AppComponent;
     let fixture:    ComponentFixture<AppComponent>;
     let de:         DebugElement;
     let el:         HTMLElement;

  beforeEach( async(() => {
      TestBed.configureTestingModule({
         providers: [
            BaseRequestOptions,
            MockBackend,
            {
                provide: Http,
                useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                return new Http(backend, defaultOptions);
                },
                deps: [MockBackend, BaseRequestOptions]
            },
            Globals
            ],
        declarations: [AppComponent],
        schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents(); // compile template and css
  }));


describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
 /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents(); // compile template and css
  }));*/

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;
	  de = fixture.debugElement.query(By.css('.title'));
  	el = de.nativeElement;

    fixture.detectChanges(); // trigger initial data binding
  });
  
  afterAll(function() {
    document.getElementById('application').style.display = 'none';     
  });

    it('should have Title set to Application Settings', () => {
      expect(el.textContent).toBe("Application Settings");
    });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
>