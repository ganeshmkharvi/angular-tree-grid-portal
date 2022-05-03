import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientTreeService {

  constructor(private http: HttpClient) { }

  getTreeDataSource() {
    return this.http.get('http://localhost:3001/api/tree');
  }

  deleteTask(taskId: number) {
    this.http.delete(`http://localhost:3001/api/tree/${taskId}`);
  }

  deleteSubTask(taskId: number, subTaskId: number) {
    this.http.delete(`http://localhost:3001/api/tree/${taskId}/subtask/${subTaskId}`);
  }
}
