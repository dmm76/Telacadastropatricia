import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileMenu } from './components/MobileMenu';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { Checkbox } from './components/Checkbox';
import { Toggle } from './components/Toggle';
import { Select } from './components/Select';
import { RichTextEditor } from './components/RichTextEditor';
import { ImageUpload } from './components/ImageUpload';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ValidationMessage } from './components/ValidationMessage';
import { FormCard } from './components/FormCard';
import { Tooltip } from './components/Tooltip';
import { Package, DollarSign, FileText, Image, ShieldCheck, Box, FolderTree, Info, Sparkles } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    productName: '',
    slug: '',
    sku: '',
    barcode: '',
    fiscalClass: '',
    salePrice: '',
    promotionalPrice: '',
    shortDescription: '',
    fullDescription: '',
    isActive: true,
    controlStock: true,
    stockQuantity: '',
    minAlert: '',
    weight: '',
    height: '',
    width: '',
    depth: '',
    brand: 'mobili',
    warranty: '12',
    categories: {
      sofas: false,
      poltronas: false,
      puffs: false,
      mesasCentro: false,
      cadeiras: false,
      cozinha: false,
      quarto: false,
      decoracao: false
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Auto-gerar slug a partir do nome do produto
  useEffect(() => {
    if (formData.productName && !touched.slug) {
      const slug = formData.productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.productName, touched.slug]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: { ...prev.categories, [category]: checked }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Nome do produto é obrigatório';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug é obrigatório';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU é obrigatório';
    }
    if (!formData.salePrice.trim()) {
      newErrors.salePrice = 'Preço de venda é obrigatório';
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Resumo curto é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isSaveDisabled = !formData.productName.trim() ||
                         !formData.slug.trim() ||
                         !formData.sku.trim() ||
                         !formData.salePrice.trim() ||
                         !formData.shortDescription.trim();

  const handleSave = () => {
    if (validateForm()) {
      console.log('Produto salvo:', formData);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  // Calcular progresso do formulário
  const requiredFields = ['productName', 'slug', 'sku', 'salePrice', 'shortDescription'];
  const filledRequiredFields = requiredFields.filter(field =>
    formData[field as keyof typeof formData] &&
    String(formData[field as keyof typeof formData]).trim() !== ''
  ).length;

  const handleCancel = () => {
    if (confirm('Deseja realmente cancelar? As alterações não salvas serão perdidas.')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeItem="products" />
      </div>

      <div className="lg:ml-56">
        <Header
          onCancel={handleCancel}
          onSave={handleSave}
          isSaveDisabled={isSaveDisabled}
        />

        <main className="p-4 md:p-8">
          {showSuccessMessage && (
            <div className="max-w-7xl mx-auto mb-4 md:mb-6">
              <ValidationMessage
                type="success"
                message="Produto salvo com sucesso! O produto já está disponível no sistema."
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* INFORMAÇÕES DO PRODUTO */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">INFORMAÇÕES DO PRODUTO</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Nome do produto"
                    placeholder="Ex: Poltrona Giratória e Puff Decorativos Costela"
                    required
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    error={errors.productName}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Slug (URL amigável)"
                        placeholder="poltrona-giratoria-puff-decorativos-costela"
                        required
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        error={errors.slug}
                      />
                      {formData.slug && !touched.slug && (
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-neutral-500">
                          <Sparkles className="w-3 h-3" />
                          <span>Gerado automaticamente</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-neutral-700">
                          SKU (Código interno)
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Tooltip content="Código único de identificação do produto no estoque" />
                      </div>
                      <Input
                        placeholder="POLTR-001"
                        required
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        error={errors.sku}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-neutral-700">Código de barras (EAN)</label>
                        <Tooltip content="Código internacional do produto (13 dígitos)" />
                      </div>
                      <Input
                        placeholder="7897133224235"
                        value={formData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-neutral-700">Classe fiscal (NCM)</label>
                        <Tooltip content="Nomenclatura Comum do Mercosul para fins fiscais" />
                      </div>
                      <Input
                        placeholder="94016100"
                        value={formData.fiscalClass}
                        onChange={(e) => handleInputChange('fiscalClass', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* PREÇOS */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">PREÇOS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Preço de venda"
                    placeholder="R$ 1.599,90"
                    required
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    error={errors.salePrice}
                  />
                  <Input
                    label="Preço promocional"
                    placeholder="R$ 1.439,90"
                    value={formData.promotionalPrice}
                    onChange={(e) => handleInputChange('promotionalPrice', e.target.value)}
                    helperText="Deixe em branco para não usar promoção"
                  />
                </div>
              </section>

              {/* DESCRIÇÃO */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">DESCRIÇÃO</h2>
                </div>

                <div className="space-y-4">
                  <Textarea
                    label="Resumo curto"
                    placeholder="Poltrona giratória confortável com acabamento premium e design moderno."
                    required
                    rows={3}
                    maxCharacters={150}
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    error={errors.shortDescription}
                  />

                  <RichTextEditor
                    label="Descrição completa"
                    value={formData.fullDescription}
                    onChange={(value) => handleInputChange('fullDescription', value)}
                    maxCharacters={2000}
                    placeholder="Poltrona giratória com base metálica e revestimento em tecido de alta qualidade. Ideal para salas de estar, quartos e escritórios. Proporciona conforto, estilo e durabilidade para o seu ambiente."
                  />
                </div>
              </section>

              {/* IMAGENS DO PRODUTO */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">IMAGENS DO PRODUTO</h2>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-neutral-900 mb-1">Imagem principal</p>
                  <p className="text-xs text-neutral-500">
                    Essa será a imagem exibida na listagem e vitrine.
                  </p>
                </div>

                <ImageUpload />

                <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-xs text-neutral-700">
                    <strong>Imagens adicionais</strong>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Adicione até 6 imagens para mostrar mais detalhes do produto.
                  </p>
                </div>
              </section>
            </div>

            {/* SIDEBAR DIREITA */}
            <div className="space-y-4 md:space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* PROGRESSO */}
              <ProgressIndicator current={filledRequiredFields} total={requiredFields.length} />

              {/* STATUS DO PRODUTO */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">STATUS DO PRODUTO</h2>
                </div>

                <div className="space-y-4">
                  <Toggle
                    label="Produto ativo"
                    description="O produto ficará visível na loja."
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <Toggle
                    label="Controlar estoque"
                    description="Habilita para gerenciar o estoque deste produto."
                    checked={formData.controlStock}
                    onChange={(e) => handleInputChange('controlStock', e.target.checked)}
                  />
                </div>
              </section>

              {/* ESTOQUE */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Box className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">ESTOQUE</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Quantidade em estoque"
                    type="number"
                    placeholder="20"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                  />
                  <Input
                    label="Alerta mínimo"
                    type="number"
                    placeholder="5"
                    value={formData.minAlert}
                    onChange={(e) => handleInputChange('minAlert', e.target.value)}
                    helperText="Receba um alerta quando o estoque atingir este nível."
                  />
                </div>
              </section>

              {/* CATEGORIAS */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FolderTree className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">CATEGORIAS</h2>
                </div>

                <p className="text-xs text-neutral-600 mb-3">Selecione as categorias *</p>

                <div className="space-y-2 mb-3">
                  <Checkbox
                    label="Sofás"
                    checked={formData.categories.sofas}
                    onChange={(e) => handleCategoryChange('sofas', e.target.checked)}
                  />
                  <Checkbox
                    label="Poltronas"
                    checked={formData.categories.poltronas}
                    onChange={(e) => handleCategoryChange('poltronas', e.target.checked)}
                  />
                  <Checkbox
                    label="Puffs"
                    checked={formData.categories.puffs}
                    onChange={(e) => handleCategoryChange('puffs', e.target.checked)}
                  />
                  <Checkbox
                    label="Mesas de Centro"
                    checked={formData.categories.mesasCentro}
                    onChange={(e) => handleCategoryChange('mesasCentro', e.target.checked)}
                  />
                  <Checkbox
                    label="Cadeiras"
                    checked={formData.categories.cadeiras}
                    onChange={(e) => handleCategoryChange('cadeiras', e.target.checked)}
                  />
                  <Checkbox
                    label="Cozinha"
                    checked={formData.categories.cozinha}
                    onChange={(e) => handleCategoryChange('cozinha', e.target.checked)}
                  />
                  <Checkbox
                    label="Quarto"
                    checked={formData.categories.quarto}
                    onChange={(e) => handleCategoryChange('quarto', e.target.checked)}
                  />
                  <Checkbox
                    label="Decoração"
                    checked={formData.categories.decoracao}
                    onChange={(e) => handleCategoryChange('decoracao', e.target.checked)}
                  />
                </div>

                <button className="text-xs text-[#B89B7C] hover:underline">
                  Gerenciar categorias →
                </button>
              </section>

              {/* INFORMAÇÕES ADICIONAIS */}
              <section className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-[#B89B7C]" />
                  <h2 className="text-base text-neutral-900">INFORMAÇÕES ADICIONAIS</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Peso (kg)"
                    type="number"
                    placeholder="15"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm text-neutral-700 mb-2">
                      Dimensões (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Altura"
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                      />
                      <Input
                        placeholder="Largura"
                        type="number"
                        value={formData.width}
                        onChange={(e) => handleInputChange('width', e.target.value)}
                      />
                      <Input
                        placeholder="Prof."
                        type="number"
                        value={formData.depth}
                        onChange={(e) => handleInputChange('depth', e.target.value)}
                      />
                    </div>
                  </div>

                  <Select
                    label="Marca"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    options={[
                      { value: 'mobili', label: 'Mobili Estofados' },
                      { value: 'outras', label: 'Outras marcas' }
                    ]}
                  />

                  <Select
                    label="Garantia"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange('warranty', e.target.value)}
                    options={[
                      { value: '3', label: '3 meses' },
                      { value: '6', label: '6 meses' },
                      { value: '12', label: '12 meses' },
                      { value: '24', label: '24 meses' }
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
