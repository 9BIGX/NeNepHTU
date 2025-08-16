import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ExportToExcel = async (data, fileName, customTitle, summaryData, columns, classSummaryData) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Thống kê');

    let rowIndex = 1;

    // 1. Tiêu đề chính
    if (customTitle) {
        worksheet.mergeCells(rowIndex, 1, rowIndex, columns.length);
        const titleCell = worksheet.getCell(rowIndex, 1);
        titleCell.value = customTitle;
        titleCell.font = { name: 'Times New Roman', size: 14, bold: true };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        rowIndex += 2;
    }

    // 2. Header các cột
    const headerRow = worksheet.getRow(rowIndex);
    columns.forEach((col, colIndex) => {
        const cell = headerRow.getCell(colIndex + 1);
        cell.value = col.header;
        cell.font = { name: 'Times New Roman', size: 12, bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };
        cell.border = {
            top: { style: 'thin' }, bottom: { style: 'thin' },
            left: { style: 'thin' }, right: { style: 'thin' }
        };
    });
    rowIndex++;

    // 3. Dữ liệu chính
    if (data && data.length > 0) {
        data.forEach(item => {
            const dataRow = worksheet.getRow(rowIndex);
            columns.forEach((col, colIndex) => {
                const cell = dataRow.getCell(colIndex + 1);
                cell.value = item[col.accessor] ?? item[col.header]; // Sử dụng cả accessor và header
                cell.font = { name: 'Times New Roman', size: 12 };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' }, bottom: { style: 'thin' },
                    left: { style: 'thin' }, right: { style: 'thin' }
                };
            });
            rowIndex++;
        });
    } else {
        console.warn('Không có dữ liệu để xuất');
    }

    // 4. Điều chỉnh độ rộng cột
    columns.forEach((col, colIndex) => {
        const column = worksheet.getColumn(colIndex + 1);
        column.width = Math.max(
            15, // Độ rộng tối thiểu
            col.header.length,
            ...(data?.map(item => String(item[col.accessor] ?? item[col.header] ?? '').length) || [])
        ) + 2;
    });

    // 5. Thêm dữ liệu tổng hợp chính
    if (summaryData && Object.keys(summaryData).length > 0) {
        rowIndex += 2;

        // Tiêu đề phần tổng hợp
        worksheet.mergeCells(rowIndex, 1, rowIndex, 2);
        const summaryTitleCell = worksheet.getCell(rowIndex, 1);
        summaryTitleCell.value = 'THỐNG KÊ TỔNG HỢP';
        summaryTitleCell.font = { name: 'Times New Roman', size: 12, bold: true };
        summaryTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        rowIndex++;

        // Dữ liệu tổng hợp
        Object.entries(summaryData).forEach(([key, value]) => {
            const keyCell = worksheet.getCell(rowIndex, 1);
            const valueCell = worksheet.getCell(rowIndex, 2);

            keyCell.value = key;
            valueCell.value = value;

            [keyCell, valueCell].forEach(cell => {
                cell.font = { name: 'Times New Roman', size: 12 };
                cell.border = {
                    top: { style: 'thin' }, bottom: { style: 'thin' },
                    left: { style: 'thin' }, right: { style: 'thin' }
                };
                cell.alignment = { vertical: 'middle' };
            });

            rowIndex++;
        });
    }

    // 6. Thêm bảng tổng hợp điểm theo lớp (ở cột thứ 4 trở đi)
    if (classSummaryData?.length > 0) {
        const startCol = columns.length + 2; // Cách bảng chính 2 cột
        const startRow = 1;

        // Tiêu đề
        worksheet.mergeCells(startRow, startCol, startRow, startCol + 2);
        const titleCell = worksheet.getCell(startRow, startCol);
        titleCell.value = 'TỔNG ĐIỂM THEO LỚP VÀ CHI TIẾT';
        titleCell.font = {
            name: 'Times New Roman',
            size: 14,
            bold: true
        };
        titleCell.alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };

        // Header
        const headerRow = worksheet.getRow(startRow + 2);
        ['Lớp', 'Tổng điểm', 'Ghi chú (Mã HS - Tên)'].forEach((text, idx) => {
            const cell = headerRow.getCell(startCol + idx);
            cell.value = text;
            cell.font = {
                name: 'Times New Roman',
                size: 12,
                bold: true
            };
            cell.alignment = {
                horizontal: 'center',
                vertical: 'middle'
            };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD3D3D3' }
            };
            cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Dữ liệu
        classSummaryData.forEach((item, idx) => {
            const dataRow = worksheet.getRow(startRow + 3 + idx);

            // Cột Lớp
            const classCell = dataRow.getCell(startCol);
            classCell.value = item['Lớp'];
            classCell.font = { name: 'Times New Roman', size: 12 };
            classCell.alignment = { horizontal: 'center', vertical: 'middle' };
            classCell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            };

            // Cột Tổng điểm trừ
            const pointCell = dataRow.getCell(startCol + 1);
            pointCell.value = Number(item['Tổng điểm']) || 0; // Sử dụng 'Tổng điểm' nếu có
            // Định dạng ô điểm
            if (pointCell.value < 0) {
                pointCell.numFmt = '#,##0;[Red]-#,##0';  // Số âm màu đỏ
                pointCell.font = { bold: true }; // In đậm
            }
            pointCell.font = { name: 'Times New Roman', size: 12 };
            pointCell.alignment = { horizontal: 'center', vertical: 'middle' };
            pointCell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            };

            // Cột Ghi chú
            const noteCell = dataRow.getCell(startCol + 2);
            noteCell.value = item['Ghi chú'];
            noteCell.font = { name: 'Times New Roman', size: 12 };
            noteCell.alignment = { horizontal: 'left', vertical: 'middle' };
            noteCell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Điều chỉnh độ rộng cột
        worksheet.getColumn(startCol).width = 10; // Lớp
        worksheet.getColumn(startCol + 1).width = 15; // Tổng điểm trừ
        worksheet.getColumn(startCol + 2).width = 60; // Ghi chú (rộng hơn để hiển thị đủ thông tin)
    }
    // Xuất file
    try {
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${fileName}.xlsx`);
    } catch (error) {
        console.error('Lỗi khi xuất file Excel:', error);
        throw error;
    }
};

export default ExportToExcel;