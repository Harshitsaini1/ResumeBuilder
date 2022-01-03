import { ResumeService } from './../../../services/resume/resume.service';
import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.css'],
})
export class ResumeTemplateComponent implements OnInit {
  resumeData: any;
  constructor(private _resumeService: ResumeService) {}

  ngOnInit(): void {
    this._resumeService.getResumeData().subscribe(
      (res) => {
        // console.log('hello');

        // console.log(res);
        this.resumeData = res;
        this.resumeData.skills = this.resumeData.skills.split(',');
        this.resumeData.languages = this.resumeData.languages.split(',');
      },
      (err) => console.error(err)
    );

    // this.resumeData = this._resumeService.getResumeData();

    // console.log(this.resumeData);
  }

  download() {
    const resume: any = document.querySelector('#resume');
    html2canvas(resume, { allowTaint: true, useCORS: true }).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, 'JPEG', 0, 0, width, height);
      pdf.save('Resume.pdf');

      // const image = canvas.toDataURL('image/jpeg', 1.0);
      // const doc = new jsPDF('p', 'px', 'a4');
      // const pageWidth = doc.internal.pageSize.getWidth();
      // const pageHeight = doc.internal.pageSize.getHeight();

      // const widthRatio = pageWidth / canvas.width;
      // const heightRatio = pageHeight / canvas.height;
      // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      // const canvasWidth = canvas.width * ratio;
      // const canvasHeight = canvas.height * ratio;

      // const marginX = (pageWidth - canvasWidth) / 2;
      // const marginY = (pageHeight - canvasHeight) / 2;

      // doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
      // doc.save('Resume.pdf');
    });
  }
}
