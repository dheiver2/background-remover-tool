// app/page.tsx
'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Input,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Grid,
  GridItem,
  Container,
  Link,
  Stack,
  Icon,
  useToast,
} from '@chakra-ui/react';
import {
  FaCheck,
  FaStar,
  FaQuoteLeft,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao processar a imagem');
      }

      const data = await response.json();
      setProcessedImage(`data:image/png;base64,${data.image}`);

      toast({
        title: 'Sucesso!',
        description: 'O fundo da imagem foi removido com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setError('Ocorreu um erro ao processar a imagem. Tente novamente.');
      console.error('Erro:', error);

      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao processar a imagem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box as="header" bg="blue.600" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="white">
              Removedor de Fundo
            </Heading>
            <Stack direction="row" spacing={4}>
              <Link href="#features" color="white">
                Recursos
              </Link>
              <Link href="#pricing" color="white">
                Preços
              </Link>
              <Link href="#faq" color="white">
                FAQ
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="container.lg" textAlign="center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Heading as="h2" size="2xl" mb={4} color="blue.600">
              Remova o Fundo das Suas Imagens
            </Heading>
          </motion.div>
          <Text fontSize="xl" color="gray.600" mb={8}>
            Faça upload de uma imagem e remova o fundo automaticamente.
          </Text>
          <VStack spacing={4}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              display="none"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload">
              <Button as="span" colorScheme="blue" size="lg" cursor="pointer">
                Clique para fazer upload
              </Button>
            </label>

            {loading && (
              <Flex align="center" gap={2}>
                <Spinner size="sm" color="blue.600" />
                <Text color="gray.600">Processando imagem...</Text>
              </Flex>
            )}

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" py={20}>
        <Container maxW="container.lg">
          <Heading as="h3" size="xl" textAlign="center" mb={8}>
            Recursos
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {[
              {
                title: 'Fácil de Usar',
                description: 'Interface simples e intuitiva.',
                icon: FaCheck,
              },
              {
                title: 'Rápido',
                description: 'Processamento em segundos.',
                icon: FaCheck,
              },
              {
                title: 'Preciso',
                description: 'Resultados de alta qualidade.',
                icon: FaCheck,
              },
            ].map((feature, index) => (
              <GridItem key={index}>
                <VStack spacing={4} textAlign="center">
                  <Icon as={feature.icon} boxSize={8} color="blue.600" />
                  <Heading as="h4" size="md">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600">{feature.description}</Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="container.lg">
          <Heading as="h3" size="xl" textAlign="center" mb={8}>
            Depoimentos
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {[
              {
                quote: 'Incrível! A remoção de fundo é muito precisa.',
                author: 'João Silva',
              },
              {
                quote: 'Economizei muito tempo com essa ferramenta.',
                author: 'Maria Souza',
              },
            ].map((testimonial, index) => (
              <GridItem key={index}>
                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                  <Icon as={FaQuoteLeft} boxSize={6} color="blue.600" mb={4} />
                  <Text fontSize="lg" color="gray.600" mb={4}>
                    {testimonial.quote}
                  </Text>
                  <Text fontWeight="bold" color="blue.600">
                    {testimonial.author}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" py={20}>
        <Container maxW="container.lg">
          <Heading as="h3" size="xl" textAlign="center" mb={8}>
            Preços
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {[
              {
                title: 'Básico',
                price: 'Grátis',
                features: ['5 imagens/mês', 'Suporte por e-mail'],
              },
              {
                title: 'Pro',
                price: 'R$ 29/mês',
                features: ['50 imagens/mês', 'Suporte prioritário'],
              },
              {
                title: 'Empresarial',
                price: 'R$ 99/mês',
                features: ['Imagens ilimitadas', 'Suporte 24/7'],
              },
            ].map((plan, index) => (
              <GridItem key={index}>
                <Box
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Heading as="h4" size="lg" mb={4}>
                    {plan.title}
                  </Heading>
                  <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    {plan.price}
                  </Text>
                  <VStack spacing={2} align="start">
                    {plan.features.map((feature, i) => (
                      <Flex key={i} align="center">
                        <Icon
                          as={FaCheck}
                          boxSize={4}
                          color="blue.600"
                          mr={2}
                        />
                        <Text>{feature}</Text>
                      </Flex>
                    ))}
                  </VStack>
                  <Button colorScheme="blue" size="lg" mt={6} w="full">
                    Escolher Plano
                  </Button>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box id="faq" py={20}>
        <Container maxW="container.lg">
          <Heading as="h3" size="xl" textAlign="center" mb={8}>
            Perguntas Frequentes
          </Heading>
          <VStack spacing={4} align="start">
            {[
              {
                question: 'Como funciona a remoção de fundo?',
                answer:
                  'Nossa ferramenta usa IA para remover o fundo das imagens automaticamente.',
              },
              {
                question: 'Posso usar a versão gratuita?',
                answer:
                  'Sim, a versão gratuita permite processar até 5 imagens por mês.',
              },
            ].map((faq, index) => (
              <Box
                key={index}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                w="full"
              >
                <Heading as="h4" size="md" mb={2}>
                  {faq.question}
                </Heading>
                <Text color="gray.600">{faq.answer}</Text>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="blue.600" py={8} color="white">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text>
              &copy; 2023 Removedor de Fundo. Todos os direitos reservados.
            </Text>
            <Stack direction="row" spacing={4}>
              <Link href="https://twitter.com/suaempresa" isExternal>
                <Icon as={FaTwitter} boxSize={6} />
              </Link>
              <Link href="https://facebook.com/suaempresa" isExternal>
                <Icon as={FaFacebook} boxSize={6} />
              </Link>
              <Link href="https://instagram.com/suaempresa" isExternal>
                <Icon as={FaInstagram} boxSize={6} />
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
