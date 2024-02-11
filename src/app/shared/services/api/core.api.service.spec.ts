import { TestBed } from "@angular/core/testing";

import { CoreApiService } from "./core.api.service";

describe("SharedApiService", () => {
  let service: CoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
