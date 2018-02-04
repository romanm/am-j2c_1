-- Зчитування таблиць
SELECT * FROM doc dTab, string tabName WHERE dTab.doc_id=tabName.string_id AND dTab.doctype=1
-- Зчитати програмний файл
SELECT b.*,doc_type FROM docbody b, (
SELECT program.*, dty.doctype doc_type FROM doc program, doctype dty WHERE program.doctype=dty.doctype_id AND dty.parent_id=9
) x WHERE doc_id=docbody_id

-- Перевірка на програмний файл
SELECT program.*, dty.doctype doc_type FROM doc program, doctype dty WHERE program.doctype=dty.doctype_id AND dty.parent_id=9

-- Зчитування структури таблиць
SELECT tabName.value tabName, colName.* FROM (
SELECT * FROM doc dTab, string tabName WHERE dTab.doc_id=tabName.string_id AND dTab.doctype=1
) tabName, (
SELECT dColumn.*,colName.value colName, colType.value colType 
FROM doc dColumn, string colName, string colType 
WHERE colName.string_id=dColumn.doc_id
and colType.string_id=dColumn.reference
) colName 
WHERE colName.parent=tabName.doc_id

-- Зчитування структури таблиць 2
SELECT d1.doc_id, s1.value tablename ,s2.value fieldname ,rs2.value fieldtype 
FROM doc d1, doc d2, doc r2, string rs2, string s1, string s2
WHERE d1.doc_id=d2.parent AND d1.doctype=1
AND s1.string_id=d1.doc_id
AND s2.string_id=d2.doc_id
AND d2.reference=r2.doc_id
AND rs2.string_id=r2.doc_id
-- 

-- 


