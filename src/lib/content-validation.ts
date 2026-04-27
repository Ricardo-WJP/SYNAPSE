export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateArticle(article: {
  title: string;
  description: string;
  category: string;
  slug: string;
  source_url: string;
  tags: string[];
}): ValidationResult {
  // 1. 标题检查
  if (!article.title || article.title.trim().length < 5) {
    return { valid: false, reason: "标题过短或为空" };
  }
  if (article.title.length > 200) {
    return { valid: false, reason: "标题过长" };
  }

  // 2. 检查标题是否为乱码或重复字符
  const title = article.title.trim();
  const uniqueChars = new Set(title).size;
  if (uniqueChars < 3 && title.length > 5) {
    return { valid: false, reason: "标题疑似乱码" };
  }

  // 3. 描述检查
  const desc = (article.description || "").trim();
  if (desc.length < 10) {
    return { valid: false, reason: "描述过短" };
  }
  if (desc.length > 2000) {
    return { valid: false, reason: "描述过长" };
  }

  // 4. 分类检查
  if (!["design", "ai"].includes(article.category)) {
    return { valid: false, reason: "分类无效" };
  }

  // 5. slug 检查
  if (!article.slug || article.slug.length < 2) {
    return { valid: false, reason: "slug 无效" };
  }

  // 6. source_url 检查
  if (!article.source_url || !article.source_url.startsWith("http")) {
    return { valid: false, reason: "来源 URL 无效" };
  }

  // 7. 标签检查
  if (!article.tags || article.tags.length === 0) {
    return { valid: false, reason: "标签为空" };
  }

  // 8. 检查常见垃圾内容模式
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|prize)\b/i,
    /\b(click here|limited time|act now)\b/i,
    /[一-龥]{0,2}[a-zA-Z]{10,}[一-龥]{0,2}/, // 中英文混杂的乱码
  ];
  const textToCheck = `${title} ${desc}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(textToCheck)) {
      return { valid: false, reason: "内容疑似垃圾信息" };
    }
  }

  return { valid: true };
}

export async function checkDuplicate(
  slug: string,
  sourceUrl: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<ValidationResult> {
  const exists = await checkExists(slug);
  if (exists) {
    return { valid: false, reason: "文章已存在" };
  }
  return { valid: true };
}
